// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant';
import router from './router'
import './rem.js'
import './assets/js/common'
import 'vant/lib/vant-css/index.css';
import './assets/css/common.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Lazyload,Toast } from 'vant';
import qs from 'qs';
import Vuex from 'vuex'
import { store } from './store/store'
import autosize from 'v-autosize/dist/plugin';
import 'lrz/dist/lrz.all.bundle'

axios.interceptors.request.use( (config) => {
  if (config.method=="post"){
    config.data = qs.stringify(config.data);
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  return config;
},  (error) => {
  return Promise.reject(error);
});
/*axios.interceptors.request.use( (config) => {
  if (config.method=="post"){
    config.data = qs.stringify(config.data);
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  loading=Toast.loading({
    mask: false,
    message: '加载中...'
  });
  // Toast.clear()
  return config;
},  (error) => {
  loading.close()
  Toast.fail('加载超时');
  return Promise.reject(error);
});
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  loading.close()
  return data
}, error => {
  loading.close()
  Toast.fail('加载失败');
  return Promise.reject(error)
})*/

Vue.use(Vant);
Vue.use(VueAxios,axios)
Vue.use(Lazyload,Toast);
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

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://ceshi.wedotop.com/Api/'
  // axios.defaults.baseURL = '/api'
  // axios.defaults.baseURL = 'https://tc.wedotop.com/Api/'
// 编译环境
} else {
  // 测试环境
  if (process.env.type === 'test') {
    axios.defaults.baseURL = 'https://tc.wedotop.com/Api/'
    // 正式环境
  } else {
    axios.defaults.baseURL = 'https://tc.wedotop.com/Api/'
  }
}


// axios.defaults.baseURL = 'https://mp.wedotop.com/Api/'
// axios.defaults.baseURL = 'http://localhost:3000/'
// axios.defaults.baseURL = 'http://192.168.1.148/card/Api/'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
