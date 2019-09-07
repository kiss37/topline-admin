import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

// 定义路由 导入单独准备的router文件
import router from './router/index'
import JSONbig from 'json-bigint'

// 导入全局基础css
import './assets/css/base.css'
// 导入axios设置到原型
import axios from 'axios';
Vue.prototype.$axios=axios
axios.defaults.baseURL="http://ttapi.research.itcast.cn/"

axios.defaults.transformResponse= [function (data) {
  // 对 data 进行任意转换处理
  // return JSONbig.parse(data);
  try {
    //如果能转换成功，就转换，并返回转换后的结果
    let obj = JSONbig.parse(data);
    return obj;

  } catch (error) {

    // 如果不能转换成功，就直接返回它原来的结果
    return data;
  }
}],

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const user =JSON.parse(window.sessionStorage.getItem('user_info'))

  if (user) 
    config.headers.Authorization=`Bearer ${user.token}`//设置请求头

  
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
  // 对响应错误做点什么当错误是  401 表示未登录 再打回登录页面
  if (error.response.status==401) {
    Vue.prototype.$message.error('请先登录')
    // 返回登录页
    router.push('/login')
  }
  return Promise.reject(error);
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
