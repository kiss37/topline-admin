<template>
  <el-container class="my-container">
    <!-- 左边栏 -->
    <el-aside width="200px" class="my-aside">侧边栏</el-aside>
    <!-- 右边大白部分 -->
    <el-main class="my-main">
      <el-container>
        <!-- 分为上下 -->
        <el-header class="my-main-header">
          <el-row class="my-row">
            <el-col :span="16">
              <span>江苏传智播客教育科技股份有限公司</span>
            </el-col>
            <el-col :span="4" :offset="4">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <img src="../../assets/logo.png" alt="">
                  <span class="username">我的妈呀</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-user-solid">个人信息</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-share">git地址</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-error">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {

  
};
</script>

<style lang="less" scoped>
.my-container {
  height: 100%;

  .my-aside {
    background-color: #323745;
  }
  .my-main {
    padding: 0;
    .my-main-header {
      background-color: pink;
      .my-row{
        height: 100%;
        display:flex;
        align-items: center;
        .el-dropdown-link{
          color: #000;
          cursor:pointer;
          display: flex;
          align-items: center;
          .username{
            margin: 0 10px;
          }
          img{
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>