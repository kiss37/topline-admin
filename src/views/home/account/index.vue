<template>
  <el-container>
    <el-aside width="500px">
      <el-form ref="userInfo" :model="userInfo" label-width="80px" label-position="top">
        <el-form-item label="媒体名称">
          <el-input v-model="userInfo.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="媒体简介">
          <el-input type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="头条号ID">
          <el-input v-model="userInfo.name" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定手机">
          <el-input v-model="userInfo.name" size="small" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.name" size="small"></el-input>
        </el-form-item>
        <el-button type="primary" >保存更新</el-button>
      </el-form>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: ""
      }
    };
  }
};
</script>

<style>
</style>