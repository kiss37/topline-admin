// 导入vue
import Vue from 'vue'
// 导入路由文件
import VueRouter from 'vue-router'

// 导入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios';
Vue.prototype.$axios=axios

// 中间键 use 一下
Vue.use(VueRouter)

// 导入组件
import login from '../views/login'
import home from '../views/home/index.vue'


// 定义路由规则
const routes = [
  { path: '/login', component: login },
  { path: '/home', component: home },
  { path: '/', redirect: '/login' },
]

// 实例化router
const router = new VueRouter({
  routes
})

// 默认把router暴露出去
export default router;