import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

// 定义路由 导入单独准备的router文件
import router from './router/index'

// 导入全局基础css
import './assets/css/base.css'
// 导入axios设置到原型
import axios from 'axios';
Vue.prototype.$axios=axios
axios.defaults.baseURL="http://ttapi.research.itcast.cn/"

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const obj =JSON.parse(window.sessionStorage.getItem('user_info'))

  if (obj) 
    config.headers.Authorization=`Bearer ${obj.token}`//设置请求头

  
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  Vue.prototype.$message.error('请先登录')
  // 返回登录页
  this.$router.push('/login')
  return Promise.reject(error);
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
