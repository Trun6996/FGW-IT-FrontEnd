// ...existing code...
import Vue from 'vue';
import Router from 'vue-router';

import Words from '../views/Words.vue';
import Test from '../views/Test.vue';
import Edit from '../views/Edit.vue';
import New from '../views/New.vue';
import Show from '../views/Show.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash', // hash mode to avoid history fallback issues during dev
  routes: [
    { path: '/', redirect: '/words' },
    { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
    { path: '/register', name: 'register', component: () => import('../views/Register.vue') },
    { path: '/users', name: 'users', component: () => import('../views/UserList.vue') },
    { path: '/words', name: 'words', component: Words },
    { path: '/test', name: 'test', component: Test },
    { path: '/edit/:id', name: 'edit', component: Edit },
    { path: '/new', name: 'new', component: New },
    { path: '/show/:id', name: 'show', component: Show },
  ],
});
// ...existing code...