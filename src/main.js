import Vue from 'vue';
import App from './App.vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';
import router from './router';
import 'semantic-ui-css/semantic.min.css';

Vue.config.productionTip = false;
Vue.use(VueFlashMessage, { timeout: 2000 });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');