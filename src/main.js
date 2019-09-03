import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

// 定义路由 导入单独准备的router文件
import router from './router/index'

// 导入全局基础css
import './assets/css/base.css'

import axios from 'axios';
Vue.prototype.$axios=axios
axios.defaults.baseURL="http://ttapi.research.itcast.cn/"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
