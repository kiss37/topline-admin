// 导入vue
import Vue from 'vue'
// 导入路由文件
import VueRouter from 'vue-router'

// 中间键 use 一下
Vue.use(VueRouter)

// 导入组件
import login from '../views/login'
import home from '../views/home/index.vue'


// 定义路由规则
const routes = [
  { path: '/login', component: login },
  { path: '/home', component: home },
]

// 实例化router
const router = new VueRouter({
  routes
})

// 默认把router暴露出去
export default router;