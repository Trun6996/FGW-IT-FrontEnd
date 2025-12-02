<template>
  <div class="user-list-card">
    <div class="user-list-header">
      <h2>User Management</h2>
    </div>
    <div v-if="users.length === 0" class="ui message">No users found.</div>
    <div v-else>
      <table class="ui celled table user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th style="width:160px">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user.username }}</td>
            <td>
              <role-badge :role="user.role" />
            </td>
            <td>
              <select v-model="user.role" @change="changeRole(user)" class="ui dropdown mini">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button class="ui icon button circular red" @click="removeUser(user._id)" title="Delete" style="margin-left:0.5rem">
                <i class="trash alternate outline icon"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '../helpers/api';
import RoleBadge from './RoleBadge.vue';

export default {
  name: 'UserListTable',
  components: {
    RoleBadge
  },
  props: {
    users: {
      type: Array,
      required: true,
    }
  },
  methods: {
    async changeRole(user) {
      try {
        await api.updateUser(user._id, { role: user.role });
      } catch (err) {
        alert('Role updated successfully.');
      }
    },
    async removeUser(id) {
      if (!confirm('Are you sure you want to delete this user?')) return;
      try {
        await api.deleteUser(id);
        this.$emit('user-deleted', id);
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  }
};
</script>

<style scoped>
.user-list-card {
  max-width: 600px;
  margin: 2.5rem auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(30,64,175,0.10), 0 1.5px 6px rgba(30,64,175,0.12);
  padding: 2.2rem 2.2rem 1.5rem 2.2rem;
}
.user-list-header {
  text-align: center;
  margin-bottom: 1.2rem;
}
.user-list-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1b70ff;
  margin: 0;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px rgba(30,64,175,0.08);
}
.user-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(30,64,175,0.07);
}
.user-table th {
  color: #1b70ff;
  font-weight: 700;
  font-size: 1.08rem;
}
</style>
