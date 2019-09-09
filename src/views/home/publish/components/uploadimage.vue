<template>
  <div>
    <div class="cover-wrap" @click="dialogVisible=true">
      <p v-if="!isShowImg">请选取图片</p>
      <i v-if="!isShowImg" class="iconfont icon-image_upload"></i>
      <img v-if="isShowImg" :src="imageUrl" alt="">
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="上传图片" name="first">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="header"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="媒体库" name="second">配置管理</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "uploadimage",
  data() {
    return {
      // 设值设置图片显示人然后p标签和i标签隐藏
      isShowImg:false,
      // 这是设值弹框
      dialogVisible: false,
      activeName: "first",
      header:{
        Authorization:`Bearer ${JSON.parse(window.sessionStorage.getItem('user_info')).token}`
      },
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(response){
      console.log(response);
      this.imageUrl=response.data.url
    },
    doOk(){
      // 显示图片隐藏文字和i标签
      this.isShowImg=true,
      // 隐藏弹框
      this.dialogVisible  = false
      // 通过子给父传值 自定义事件
      this.$emit("change", this.imageUrl);
    }
  },
};
</script>

<style lang="less" scoped>
.cover-wrap {
  padding: 10px;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    height: 100%;
    width: 100%;
  }
  p {
    font-size: 20px;
    margin: 20px 0 40px;
  }
  i {
    width: 120px;
    height: 120px;
    font-size: 120px;
    color: #eee;
  }
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