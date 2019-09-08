<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-radio-group v-model="menu" size="medium">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
    </div>
  
     <el-card :body-style="{ padding: '0px' }">
      <div>
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      </div>
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>

  </el-card>
</template>

<script>
export default {
  data() {
    return {
      menu: "全部"
    };
  },
  methods: {
    loadData(page=1){
      // 发请求
      
    }
  },
};
</script>

<style>
</style>