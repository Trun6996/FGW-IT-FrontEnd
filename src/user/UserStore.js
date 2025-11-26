// Simple user store for login and role
import Vue from 'vue';

const state = Vue.observable({
  username: '',
  role: '',
  id: null,
  loggedIn: false,
});

export default {
  get username() { return state.username; },
  get role() { return state.role; },
  get id() { return state.id; },
  get loggedIn() { return state.loggedIn; },
  login(username, role, id = null) {
    state.username = username;
    state.role = role;
    state.id = id;
    state.loggedIn = true;
  },
  logout() {
    state.username = '';
    state.role = '';
    state.id = null;
    state.loggedIn = false;
  },
};
