<template>
  <el-container>
    <el-aside width="500px">
      <el-form ref="userInfo" :model="userInfo" label-width="80px" label-position="top">
        <el-form-item label="媒体名称">
          <el-input v-model="userInfo.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="媒体简介">
          <el-input type="textarea" :rows="2" v-model="userInfo.intor" size="small"></el-input>
        </el-form-item>
        <el-form-item label="头条号ID">
          <el-input v-model="userInfo.id" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定手机">
          <el-input v-model="userInfo.mobile" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" size="small"></el-input>
        </el-form-item>
        <el-button type="primary" @click="doSave">保存更新</el-button>
      </el-form>
    </el-aside>
    <el-main>
      <!-- 这个组件默认自带发post请求 而我们需要发送patch请求所以通过自定义一个请求 http-request -->
      <!-- <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      > -->
      <el-upload
        action=""
        class="avatar-uploader"
        :http-request="cunstomUpload"
        :show-file-list="false"
        >
        <img v-if="$store.state.userInfo.photo" :src="$store.state.userInfo.photo" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-main>
  </el-container>
</template>

<script>
import { log } from 'util';
export default {
  name:"account",
  data() {
    return {
      userInfo: {
        
      }
    };
  },
  methods: {
    doSave() {
      //   // 发送axios  因为userInfo就是一个对象所以直接传参数
      this.$axios.patch(`/mp/v1_0/user/profile`, this.userInfo).then(res => {
        // console.log(res);
        if (res.data.message.toLowerCase() == "ok") {
          this.$message.success("修改成功");
          // 当用户数据发生更改时候 也要给vuex重新赋值
          this.$store.commit('changeUserInfo',this.userInfo)
        }else{
          this.$message.error("修改失败")
        }
      }).catch(error=>{
        this.$message.error("修改失败")
      });
    },
    cunstomUpload(data){
      // 发送 patch请求
      // console.log(data);
      // 上传文件通过formdata上传
      let fm=new FormData()
      fm.append("photo",data.file)
      // 发送请求
      this.$axios.patch('/mp/v1_0/user/photo',fm)
      .then(res=>{
        // console.log(res);
        this.userInfo.photo=res.data.data.photo
        //当图片photo发生改变时候 就重新给vuex赋值
         this.$store.commit('changeUserInfo',this.userInfo)
      })
    }
  },
  created() {
    // 一进来发送请求获取用户所有信息
    this.$axios.get(`/mp/v1_0/user/profile`).then(res => {
      // console.log(res);
      this.userInfo = res.data.data;
      
      // 使用vuex 调用方法修改值 直接把我们的userInfo 传过去进行赋值
      this.$store.commit('changeUserInfo',this.userInfo)
    });
  }
};
</script>

<style>
.avatar-uploader{
  margin: 40px 0 0 40px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>