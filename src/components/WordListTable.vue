<template>
  <div>
    <div class="words-header">
      <h2>All Words</h2>
      <div class="search-add-wrap">
        <input type="text" class="ui input search-input" placeholder="Search words..." v-model="filter" @input="onFilter" />
        <router-link v-if="user.loggedIn" to="/new" class="ui primary button add-btn">
          <i class="plus icon"></i> Add Word
        </router-link>
      </div>
    </div>

    <table class="ui celled table words-table">
      <thead>
        <tr>
          <th>English</th>
          <th>German</th>
          <th>Vietnamese</th>
          <th style="width:180px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="word in filteredWords" :key="word._id" class="word-row">
          <td>{{ word.english }}</td>
          <td>{{ word.german }}</td>
          <td>{{ word.vietnamese }}</td>
          <td>
            <router-link :to="{ name: 'show', params: { id: word._id } }" class="ui icon button circular blue" title="Show">
              <i class="eye icon"></i>
            </router-link>
            <router-link v-if="canModify(word)" :to="{ name: 'edit', params: { id: word._id } }" class="ui icon button circular orange" style="margin:0 0.4rem" title="Edit">
              <i class="edit icon"></i>
            </router-link>
            <button v-if="canModify(word)" class="ui icon button circular red" @click="remove(word._id)" title="Delete">
              <i class="trash alternate outline icon"></i>
            </button>
          </td>
        </tr>
        <tr v-if="!filteredWords.length">
          <td colspan="4" class="center aligned">No words found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../helpers/api";
import userStore from '../user/UserStore';

export default {
  name: "WordListTable",
  props: {
    words: {
      type: Array,
      required: true,
    },
    filter: {
      type: String,
      required: true,
    }
  },
  computed: {
    filteredWords() {
      const q = (this.filter || '').trim().toLowerCase();
      if (!q) return this.words;
      return this.words.filter(w => {
        return (
          (w.english || '').toLowerCase().includes(q) ||
          (w.german || '').toLowerCase().includes(q) ||
          (w.vietnamese || '').toLowerCase().includes(q)
        );
      });
    },
    user() {
      return userStore;
    }
  },
  methods: {
    onFilter() {},
    canModify(word) {
      const ownerId = word && (word.userId || word.user_id || word.user);
      return this.user.role === 'admin' || (this.user.loggedIn && ownerId && String(ownerId) === String(this.user.id));
    },
    async remove(id) {
      const w = this.words.find(x => x._id === id);
      const ownerId = w && (w.userId || w.user_id || w.user);
      const canDelete = this.user.role === 'admin' || (this.user.loggedIn && ownerId && String(ownerId) === String(this.user.id));
      if (!canDelete) {
        alert('You are not allowed to delete this word.');
        return;
      }
      if (!confirm('Are you sure you want to delete this word?')) return;
      try {
        await api.deleteWord(id);
        this.$emit('word-deleted', id);
      } catch (err) {
        console.error('Failed to delete word', err);
        alert('Failed to delete. See console for details.');
      }
    }
  }
};
</script>

<style scoped>
.words-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}
.words-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1b70ff;
  margin: 0;
}
.search-add-wrap {
  display: flex;
  gap: 0.7rem;
  align-items: center;
}
.search-input {
  min-width: 220px;
  border-radius: 8px !important;
  border: 1px solid #dbeafe !important;
  padding: 0.5rem 1rem !important;
}
.add-btn {
  border-radius: 8px !important;
  font-weight: 600;
  padding: 0.5rem 1.2rem !important;
}
.words-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(30,64,175,0.07);
}
.words-table thead tr {
  background: #e0eaff;
}
.words-table th {
  color: #1b70ff;
  font-weight: 700;
  font-size: 1.08rem;
}
.word-row {
  transition: background 0.18s;
}
.word-row:hover {
  background: #f3f8ff !important;
}
</style>
