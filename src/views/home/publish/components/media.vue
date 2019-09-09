<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-radio-group v-model="menu" size="medium" @change="changeMenu">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>

      <el-upload
        class="upload-demo"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        style="float:right"
        :headers="header"
        :on-success="doSuccess"
        name="image"
        :show-file-list="false"
      >
      </el-upload>
    </div>

    <!-- gutter 設置每個盒子間距 -->
    <el-row :gutter="20">
      <el-col :span="8" class="my-col" v-for="item in imgList">
        <el-card :body-style="{ padding: '0px' }">
          <div @click="shose(item)" :class="{checked:item.id==currentId}" class="top-img">
            <img :src="item.url" class="image" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 页码 -->
    <!-- page-size设置每页12条 -->
    <el-pagination
      background
      :page-size="12"
      @current-change="pageChange"
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  name:"media123",
  data() {
    return {
      // 默认选择了全部
      menu: "全部",
      imgList: [],
      total: 0,
      // 设置请求头
      header: {
        Authorization: `Bearer ${
          JSON.parse(window.sessionStorage.getItem("user_info")).token
        }`
      },
      // 保存当前点击的图片
      currentId: ""
    };
  },
  methods: {
    shose(item) {
      // 当点击调用的方法  加上类名和伪元素
      this.currentId = item.id;
      // 把当前被点击的图片的url传给对话框
      
      this.$emit('checked',item.url)
    },
    
    // 收藏删除
    doDel(item) {
      this.$axios.delete(`/mp/v1_0/user/images/${item.id}`).then(res => {
          this.loadData();
      });
    },
    // 上传成功执行的回调函数
    doSuccess(response) {
      this.loadData();
    },
    loadData(page = 1) {
      // 发请求
      this.$axios
        .get("/mp/v1_0/user/images", {
          params: {
            per_page: 12,
            page: page,
            // 当按钮是收藏时候就为true 就会只查收藏
            collect: this.menu == "收藏"
          }
        })
        .then(res => {
          // console.log(res);
          // 把整數組賦值給imgList 準備 v-for遍歷

          this.imgList = res.data.data.results;
          this.total = res.data.data.total_count;

          // console.log(this.imgList);
          // 存一下总内容条数
        });
    },
    // 收藏菜单改变的事件
    changeMenu() {
      this.loadData();
    },
    // 页码改变事件
    pageChange(page) {
      this.loadData(page);
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style lang="less" scoped>
.my-col {
  margin-bottom: 15px;
  .top-img {
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.checked::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABmCAYAAADf9i8mAAAAAXNSR0IArs4c6QAABexJREFUeAHt3MmL1EoYAPAv1cm44YIILuOGqIiiIigehIegF3n6B9jMxYvMwYOK+zKXh55ExQXGh4IIKoqIIiIigqAgiq9VBvSgBy8yB0EZL8p0Onn1pU1Nd6a7J52uqmxfQFOVrnRVvt9UVVIZxvjd0/M3VCoMaIs1AgXDGDKZ43S7AP38nxFra3JeuQNQYl03bvxrGEYvl+AetMUZAW94IpA4CUbqFnMFgYwEJa6UwMAGEEhcDNV66zAIJGEYBBIfyKie4TeFhiw/Evr2TTGwCQSiDwJraomBBQgEo6BnGxMDm0EgCcIgkIRhEIh6kFDDVG0zaMiqjYbcdNsYWD2ByEXwvy0SBoH44ZO7j4xBIC0gJk4EtnEjGLNmtSg0+iMpL5SGi8WdruvSCyqM7/Tp0HX8OBgzZ4I7NATDu3YBf5M6OvKBI/ydUqmjnuF/H80hfyIxbRpYR496EH5s2tlLwcAKcw8ydSpYvEew2bO9+Lu2DfalS6F6hQ8mDSPXIFOmgHXsWD3E2bPgvHvnxznUXipGLkEmT65CdHd7AXf5/GCfOwdOqRQKoLaQdIxcgSAEnyPY3LkjEOfPg/PmTW2MQ6eVYOQCZNIksI4cATZ/fhXCccC+cAGc169DBz9YUBlGpkEQAnvEggUjEBcvgvPqVTC+beWVYmQShD/QWYcPA1u40Au0iz2ivx+cly/bCnyjwsoxsFLtt708YIXt26GwdStAodDouqMdmzABrEOHgC1a5J3vQfDbV+fFi2jfFzhLCwbWqROksHkzmNu2gVksgolPwIaEhYbx46sQixd7IeQrDmBfvgzO8+eBkEbPasPAJuoCcb9+FREprF8PZm+vyEdKjBsH1sGDwJYs8U73IK5cAefZs0hf1+wkiX24WRX1x/8ZGPivb9WqQX6UjyFqftnaHeRfz3+S2dKlXuU40Rr8Cdl5+7a+MWFyCHHgALBly0Rp++pVcJ4+FXkZCb42NagdAxuuBWRgwAPwx3dvzwPr8uOht66uKsTy5eKUMkI8eSLyshKxYeAF6ADBnoCrp/6zgNdT+Fjvfvw4dgwtC6z9+4GtWCHK2teugfP4scjLTMSKgReiBYQ/DRvz5gH7s1zB8Kf81y9wP31qHkuE2LcP2MqVoox9/TpUHj0SedkJxNA6gTe6AOWTOt714BLF+/eierOnB9imTSJflzBNsPburYe4eRMqDx/WFVORiR0DL0o5CF+8K58+Dc6HDyKG5o4dwDZsEHkvwZ9JzD17gK1eLY7bt29D5cEDkVeZSAQGXqBykHIZyqdOgfP5sxdPgzHvlpetXVuNL0Ls3g2FNWuqef6/fecOVO7dE3nVCQlPQ3KbqPwVLq4r4Usgf4EPXwKdOQP4zrqwbp24GPvuXahwDF0bnzNKicPAi1cOgi+D+vqAzZnTMNb2/ftQuXWr4WeqDiJGYoap2otUPmT9/AnlkyfB/fattlovbfP5QTeE34hEYmDjlIN8/w7DJ06A++OHHwuw+R1Thd85xbUlcpiqDYbyIWvGDChs2QLuly9SF/1qryFMOrFzRrDxykGCFcaQT+ycEYyF8iErWGFM+cTOGcF45AEkNRiIk3WQVGFkHSR1GFkGSSVGVkFSi5FFkFRjZA0k9RhZAskERlZAMoORBZBMYaQdJHMYaQbJJEZaQTKLkUaQTGOkDSTzGGkCyQVGWkByg5EGkFxhJB0kdxhJBsklRlJBcouRRJBcYyQNJPcYSQIhDNTgWxJ+DYgwqhaJACGMGgxMxtlDCCOAEScIYTTAiAuEMJpgxAFCGC0wdIMQxhgYOkEIIwSGLhDCCImhA4Qw2sBQDUIYbWKoBCGMCBiqQAgjIoYKEMLoAEM2CGF0iCEThDAkYMgCIQxJGDJACEMiRqcghCEZoxMQwlCAERWEMBRhRAEhDIUY7YIQhmKMdkAIQwNGWBDC0IQRBoQwNGKMBUIYmjFagRBGDBjNQAgjJoxGIIn/I8Mxxkpb1d7f7QXYqa1Cqqh1BMrF4l+tS9CnFIG8RuB//8JqKGTsFxoAAAAASUVORK5CYII=)
        no-repeat top right;
      background-size: 40px;
      background-color: rgba(0, 0, 0, 0.5);
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>