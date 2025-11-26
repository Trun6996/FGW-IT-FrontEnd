<template>
  <div id="app">
    <header-nav></header-nav>

    <div class="ui container main-content" style="margin-top:1rem;">
      <flash-message></flash-message>
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';

export default {
  name: 'App',
  components: {
    HeaderNav
  }
};
</script>

<style>
.main-content { padding-top: 1rem; }
</style>