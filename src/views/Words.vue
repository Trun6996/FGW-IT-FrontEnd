<template>
  <div>
    <div v-if="loading" class="ui active inline loader"></div>
    <div v-else>
      <WordListTable :words="words" :filter="filter" @word-deleted="removeWordFromList" />
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import api from "../helpers/api";
import userStore from '../user/UserStore';
import WordListTable from '../components/WordListTable.vue';

export default {
  name: "Words",
  components: { WordListTable },
  data() {
    return {
      words: [],
      loading: true,
      filter: '',
    };
  },
  computed: {
    user() {
      return userStore;
    }
  },
  async mounted() {
    try {
      this.words = await api.getWords();
    } catch (err) {
      console.error("Failed to fetch words:", err);
      if (this.$root && this.$root.$emit) {
        this.$root.$emit('flash', { type: 'error', text: 'Failed to load words from server' });
      }
    } finally {
      this.loading = false;
    }
  },
  methods: {
    removeWordFromList(id) {
      this.words = this.words.filter(w => w._id !== id);
    }
  }
};
</script>
