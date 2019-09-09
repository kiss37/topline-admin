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
        name='image'
        :show-file-list="false"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>

    <!-- gutter 設置每個盒子間距 -->
    <el-row :gutter="20">
      <el-col :span="4" class="my-col" v-for="item in imgList" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <div class="top-img">
            <img :src="item.url" class="image" />
          </div>
          <div class="content-btn">
            <el-tooltip :content="item.is_collected?'取消收藏':'收藏'" placement="top">
              <el-button
              @click="doCollect(item)"
                type="text"
                style="margin-right:20px"
                :class="item.is_collected?'el-icon-star-on':'el-icon-star-off'"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="刪除" placement="top">
              <el-button @click="doDel(item)" style="margin-left:20px" type="text" class="el-icon-delete"></el-button>
            </el-tooltip>
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
  data() {
    return {
      // 默认选择了全部
      menu: "全部",
      imgList: [],
      total: 0,
      // 设置请求头
      header: {
        Authorization: `Bearer ${JSON.parse(window.sessionStorage.getItem('user_info')).token}`
      }
    };
  },
  methods: {
    // 修改收藏状态
    doCollect(item){
      item.is_collected=!item.is_collected;
      this.axios.put(`/mp/v1_0/user/images/${item.id}`,{
        
      })
    },
    // 收藏删除
    doDel(item){
      this.$axios.delete(`/mp/v1_0/user/images/${item.id}`)
      .then(res => {
        if (res.data=='') {
        this.loadData();
        }
      })
    },
    // 上传成功执行的回调函数
    doSuccess(response){
      this.loadData();
    },
    loadData(page = 1) {
     this.$axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
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
    margin-bottom: 25px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .content-btn {
    background: #f4f5f6;
    display: flex;
    justify-content: center;
  }
}
</style>