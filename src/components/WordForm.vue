<template>
  <div class="word-form-card">
    <div class="form-header">
      <h2>{{ isEdit ? 'Edit Word' : 'Add New Word' }}</h2>
    </div>
    <form class="ui form" @submit.prevent="onSubmit">
      <div class="field">
        <label>English</label>
        <input type="text" v-model="localWord.english" placeholder="e.g. hello" />
      </div>
      <div class="field">
        <label>German</label>
        <input type="text" v-model="localWord.german" placeholder="e.g. hallo" />
      </div>
      <div class="field">
        <label>Vietnamese</label>
        <input type="text" v-model="localWord.vietnamese" placeholder="e.g. xin chào" />
      </div>
      <div v-if="errors.length" class="ui red message">
        <ul style="margin:0;padding-left:1.2rem">
          <li v-for="err in errors" :key="err">{{ err }}</li>
        </ul>
      </div>
      <div style="margin-top:1.2rem; display:flex; gap:0.7rem;">
        <button class="ui primary button" type="submit">
          <i :class="isEdit ? 'edit' : 'plus'" class="icon"></i>
          {{ isEdit ? "Update" : "Create" }}
        </button>
        <router-link class="ui button" to="/words">Cancel</router-link>
      </div>
    </form>
  </div>
</template>
<style scoped>
.word-form-card {
  max-width: 520px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(30,64,175,0.08), 0 1.5px 6px rgba(30,64,175,0.10);
  padding: 2.2rem 2.2rem 1.5rem 2.2rem;
}
.form-header {
  text-align: center;
  margin-bottom: 1.2rem;
}
.form-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1b70ff;
  margin: 0;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px rgba(30,64,175,0.08);
}
</style>

<script>
import { validateWordForm } from '../helpers/FormValidation';

export default {
  name: "WordForm",
  props: {
    word: {
      type: Object,
      required: false, // new word will pass empty
    },
    isEdit: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      localWord: { ...this.word },
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      this.errors = validateWordForm(this.localWord);
      
      if (this.errors.length > 0) return;
      
      this.$emit("submit", this.localWord);
    }
  }
};
</script>