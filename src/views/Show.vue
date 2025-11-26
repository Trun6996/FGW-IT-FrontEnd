<template>
  <div class="word-detail-page">
    <div v-if="!word" class="ui active inline loader"></div>

    <div v-else class="word-detail-card">
      <div class="detail-header">
        <h2 class="detail-title">{{ word.english }}</h2>
        <p class="detail-subtitle">Word Details</p>
      </div>

      <div class="detail-content">
        <div class="word-field">
          <label class="field-label">
            <img src="england.png" class="flag-icon"></img> English
          </label>
          <p class="field-value english-text">{{ word.english }}</p>
        </div>

        <div class="word-field">
          <label class="field-label">
            <img src="german.png" class="flag-icon"></img> German
          </label>
          <p class="field-value german-text">{{ word.german }}</p>
        </div>

        <div class="word-field">
          <label class="field-label">
            <img src="vietnam.png" class="flag-icon"></img> Vietnamese
          </label>
          <p class="field-value vietnamese-text">{{ word.vietnamese }}</p>
        </div>
      </div>

      <div class="detail-actions" v-if="canModify">
        <router-link :to="{ name: 'edit', params: { id: word._id } }"
                     class="ui primary button edit-btn">
          <i class="edit icon"></i> Edit Word
        </router-link>
        <button class="ui red button delete-btn" @click="deleteWord">
          <i class="trash alternate outline icon"></i> Delete Word
        </button>
      </div>

      <div v-if="!canModify" class="ui yellow message no-permission">
        <i class="lock icon"></i> You can only edit or delete your own words. (Admin can edit any word)
      </div>

      <router-link to="/words" class="back-link">
        <i class="arrow left icon"></i> Back to All Words
      </router-link>
    </div>
  </div>
</template>

<script>
import api from "../helpers/api";
import userStore from '../user/UserStore';

export default {
  name: "Show",
  data() {
    return {
      word: null,
    };
  },
  computed: {
    user() {
      return userStore;
    },
    canModify() {
      if (!this.word) return false;
      const ownerId = this.word.userId || this.word.user_id || this.word.user;
      return this.user.role === 'admin' || (this.user.loggedIn && ownerId && String(ownerId) === String(this.user.id));
    }
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
  },
  methods: {
    async deleteWord() {
      if (!this.canModify) {
        alert('You are not allowed to delete this word.');
        return;
      }
      if (confirm("Are you sure you want to delete this word?")) {
        await api.deleteWord(this.word._id);
        this.$router.push("/words");
      }
    }
  }
};
</script>

<style scoped>
.word-detail-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.word-detail-card {
  max-width: 520px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(30, 64, 175, 0.10), 0 1.5px 6px rgba(30, 64, 175, 0.12);
  padding: 2.2rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e0eaff;
}

.detail-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1b70ff;
  margin: 0 0 0.5rem 0;
  word-break: break-word;
}

.detail-subtitle {
  font-size: 0.95rem;
  color: #999;
  margin: 0;
  font-weight: 500;
}

.detail-content {
  margin-bottom: 2rem;
}

.word-field {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.word-field:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.6rem;
}

.field-label i {
  color: #1b70ff;
  font-size: 1.1rem;
}

.flag {
  font-size: 1.3rem;
  display: inline-block;
}

.field-value {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  padding: 0.8rem 0;
  color: #222;
  word-break: break-word;
}

.english-text {
  color: #1b70ff;
}

.german-text {
  color: #e91e63;
}

.vietnamese-text {
  color: #ff9800;
}

.detail-actions {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.edit-btn,
.delete-btn {
  flex: 1;
  border-radius: 8px !important;
  font-weight: 600;
  padding: 0.8rem 1.2rem !important;
}

.delete-btn {
  background: #f44336 !important;
  color: #fff !important;
}

.delete-btn:hover {
  background: #d32f2f !important;
}

.no-permission {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.back-link {
  display: inline-block;
  color: #1b70ff;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}

.back-link:hover {
  border-bottom-color: #1b70ff;
}
</style>