// 导入vue
import Vue from 'vue'
// 导入路由文件
import VueRouter from 'vue-router'

// 导入饿了么ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 中间键 use 一下
Vue.use(VueRouter)

// 导入组件
import login from '../views/login'
import home from '../views/home/index.vue'
import publish from '../views/home/publish'
import article from '../views/home/article/index.vue'
import comment from '../views/comment'
//导入进度条插件 以及css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 定义路由规则
const routes = [
  { path: '/login', component: login },
  {
    path: '/home',
    component: home,
    children: [
      { path: '/article', component: article },
      { path: '/publish', component: publish },
      { path: '/publish/:id', component: publish,name:"publish-edit" },
      { path: '/comment', component: comment,name:"comment" }
    ]
  },
  { path: '/', redirect: '/login' }
]

// 实例化router
const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置进度条
  next()
  // NProgress.start()
  // // if当to.path 是不是去/home
  // if(to.path!='/login'){
  //   // 做登录判断依据就算res是有值还是为空 , 有值就放行 没值打回login页面
  //   var res=window.sessionStorage.getItem('user_info')
  //   if (res) {
  //     next()
  //   }else{
  //     next('/login')
  //   }
  // }else{
  //   next()
  // }
})

router.afterEach((to, from) => {
  NProgress.done()
})

// 默认把router暴露出去
export default router
