<template>
  <div class="ui inverted segment header-segment">
    <div class="ui container">
      <div class="ui secondary pointing menu large">
        <router-link to="/words" class="header item brand">Vocab Builder</router-link>

        <div class="right menu">
          <router-link v-if="user.loggedIn" to="/words" class="item nav-item" exact>All Words</router-link>
          <router-link v-if="user.loggedIn" to="/new" class="item nav-item" exact>Add Word</router-link>
          <router-link v-if="user.loggedIn" to="/test" class="item nav-item" exact>Test</router-link>
          <router-link v-if="user.loggedIn && user.role === 'admin'" to="/users" class="item nav-item" exact>User Management</router-link>

          <router-link v-if="!user.loggedIn" to="/login" class="item nav-item">Login</router-link>
          <router-link v-if="!user.loggedIn" to="/register" class="item nav-item">Register</router-link>

          <div v-if="user.loggedIn" class="item user-info">
            <user-avatar :username="user.username" />
            <span class="user-name">{{ user.username }}</span>
            <role-badge :role="user.role" />
          </div>

          <a v-if="user.loggedIn" class="item logout" @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userStore from '../user/UserStore';
import UserAvatar from './UserAvatar.vue';
import RoleBadge from './RoleBadge.vue';

export default {
  name: 'HeaderNav',
  components: {
    UserAvatar,
    RoleBadge
  },
  computed: {
    user() { return userStore; }
  },
  methods: {
    logout() {
      userStore.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.header-segment {
  padding: 0.4rem 0;
  background: #1b70ff;
}
.brand {
  font-weight: 700;
  color: #fff !important;
  font-size: 1.1rem;
}
.nav-item {
  color: rgba(255, 255, 255, 0.95) !important;
  padding: 0.55rem 0.9rem;
  border-radius: 6px;
}
.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  background: none !important;
  border: none !important;
  border-bottom: 4px solid #fff !important;
  color: #fff !important;
  font-weight: bold !important;
  box-shadow: none !important;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  padding: 0 0.5rem;
}
.user-name {
  color: #fff;
  margin-left: 6px;
  font-weight: 600;
}
.logout {
  color: #fff !important;
}
</style>
