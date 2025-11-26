<template>
  <div>
    <WordForm :word="{ english: '', german: '', vietnamese: '' }"
              @submit="createWord" />
  </div>
</template>

<script>
import api from "../helpers/api";
import WordForm from "../components/WordForm.vue";
import userStore from '../user/UserStore';

export default {
  name: "NewWord",
  components: { WordForm },
  methods: {
    async createWord(data) {
      // attach creator id if logged in
      if (userStore.loggedIn && userStore.id) {
        data.userId = userStore.id;
      }
      await api.createWord(data);
      this.$router.push("/words");
    }
  }
};
</script>