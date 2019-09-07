import Vue from 'vue'
// 导入vuex 
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 放数据
  state:{
    userInfo:{
      photo:"",
      name:""
    }
  },
  // 存方法
  mutations:{
    changeUserInfo(state,val){
      // es6的新赋值语法
      // 相当于把val所有的值都赋给了userinfo  底层就是 forin  循环遍历对象进行赋值
      Object.assign(state.userInfo,val)
    }
  }
})

// 暴露store 实例 应为他需要挂载到vue实例上和router一样
export default store