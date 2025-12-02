<template>
  <div>
    <UserListTable :users="users" @user-deleted="removeUserFromList" />
  </div>
</template>
<style scoped>
</style>

<script>
import api from '../helpers/api';
import userStore from '../user/UserStore';
import UserListTable from '../components/UserListTable.vue';

export default {
  name: 'UserList',
  components: { UserListTable },
  data() {
    return {
      users: [],
      error: '',
    };
  },
  async mounted() {
    if (userStore.role !== 'admin') {
      this.error = 'Only admin can view users.';
      return;
    }
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        this.users = await api.getUsers(); // Fetch users from API
      } catch (err) {
        this.error = 'Failed to load users.';
      }
    },
    removeUserFromList(id) {
      this.users = this.users.filter(u => u._id !== id);
    }
  },
};
</script>
