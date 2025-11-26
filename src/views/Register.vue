<template>
  <div class="ui segment" style="max-width:400px;margin:2rem auto;">
    <h2 class="ui header">Register</h2>
    <form class="ui form" @submit.prevent="onRegister">
      <div class="field">
        <label>Username</label>
        <input v-model="username" placeholder="Enter username" />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Enter password" />
      </div>
      <div class="field">
        <label>Confirm Password</label>
        <input type="password" v-model="confirm" placeholder="Confirm password" />
      </div>
      <!-- Role selection removed for logic: always register as user -->
      <button class="ui primary button" type="submit">Register</button>
      <div v-if="error" class="ui red message" style="margin-top:1rem">{{ error }}</div>
      <div v-if="success" class="ui green message" style="margin-top:1rem">{{ success }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      confirm: '',
      // role: 'user',
      error: '',
      success: '',
    };
  },
  methods: {
    async onRegister() {
      this.error = '';
      this.success = '';
      if (!this.username || !this.password || !this.confirm) {
        this.error = 'Please enter all fields.';
        return;
      }
      if (this.password !== this.confirm) {
        this.error = 'Passwords do not match.';
        return;
      }
      try {
        const res = await axios.post('http://localhost:3000/users', {
          username: this.username,
          password: this.password,
          role: 'user', // always register as user
        });
        this.success = 'Registered successfully!';
        this.username = '';
        this.password = '';
        this.confirm = '';
      } catch (err) {
        this.error = err.response?.data?.error || 'Registration failed.';
      }
    },
  },
};
</script>