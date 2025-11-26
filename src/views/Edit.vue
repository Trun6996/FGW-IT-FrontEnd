<template>
  <div>
    <h2 class="ui header">Edit Word</h2>
    <WordForm v-if="word"
              :word="word"
              :isEdit="true"
              @submit="updateWord" />
  </div>
</template>

<script>
import api from "../helpers/api";
import WordForm from "../components/WordForm.vue";
import userStore from '../user/UserStore';

export default {
  name: "Edit",
  components: { WordForm },
  data() {
    return {
      word: null,
    };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
    // check permission: only admin or creator can edit
    const ownerId = this.word && (this.word.userId || this.word.user_id || this.word.user);
    const canEdit = userStore.role === 'admin' || (userStore.loggedIn && ownerId && String(ownerId) === String(userStore.id));
    if (!canEdit) {
      alert('You are not allowed to edit this word.');
      this.$router.push('/words');
    }
  },
  methods: {
    async updateWord(data) {
      await api.updateWord(this.$route.params.id, data);
      this.$router.push("/words");
    }
  }
};
</script>