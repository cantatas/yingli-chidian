
import '@/assets/css/global.css';
import '@/assets/static/icon/iconfont.css';
import '@/assets/sass/base.scss';

import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';
import mixin from './common/mixin';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  mixins: [mixin],
}).$mount('#app');
