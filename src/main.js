// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant';
import router from './router'
import './rem.js'
import 'vant/lib/vant-css/index.css';
import './assets/css/common.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Lazyload } from 'vant';
import qs from 'qs';
import Vuex from 'vuex'
import { store } from './store/store'
import autosize from 'v-autosize/dist/plugin';

axios.interceptors.request.use( (config) => {
  if (config.method=="post"){
    config.data = qs.stringify(config.data);
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  return config;
},  (error) => {
  return Promise.reject(error);
});

Vue.use(Vant);
Vue.use(VueAxios,axios)
Vue.use(Lazyload);
Vue.use(Vuex)
Vue.use(autosize);

// 标题
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.config.productionTip = false
//环境的切换
/*if (process.env.NODE_ENV == 'development') {
  // axios.defaults.baseURL = 'http://localhost:3000/';
  // axios.defaults.baseURL = 'http://192.168.1.148/card/Api/';
  axios.defaults.baseURL = 'https://mp.wedotop.com/Api/';
}
else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = 'https://mp.wedotop.com/Api/';
}
else if (process.env.NODE_ENV == 'prodution') {
  axios.defaults.baseURL = 'https://mp.wedotop.com/Api/';
}
// Vue.prototype.baseURL = process.env.API_ROOT;*/


// axios.defaults.baseURL = 'https://mp.wedotop.com/Api/'
axios.defaults.baseURL = 'http://192.168.1.148/card/Api/'
// axios.defaults.baseURL = 'http://localhost:3000/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
