<template>
  <div class="ui segment" style="max-width:400px;margin:2rem auto;">
    <h2 class="ui header">Login</h2>
    <form class="ui form" @submit.prevent="onLogin">
      <div class="field">
        <label>Username</label>
        <input v-model="username" placeholder="Enter username" />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Enter password" />
      </div>
      <!-- Role selection removed for logic: role will be set from database after login -->
      <button class="ui primary button" type="submit">Login</button>
      <div v-if="error" class="ui red message" style="margin-top:1rem">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import userStore from '../user/UserStore';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      // role: 'user',
      error: '',
    };
  },
  methods: {
    async onLogin() {
      if (!this.username || !this.password) {
        this.error = 'Please enter username and password.';
        return;
      }
      try {
        const res = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, password: this.password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        userStore.login(data.username, data.role, data._id);
        this.$router.push('/words');
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>
