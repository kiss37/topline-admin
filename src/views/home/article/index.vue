<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="searchParams">
        <el-form-item label="状态">
          <el-radio-group v-model="searchParams.status">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">草稿</el-radio>
            <el-radio :label="3">待审核</el-radio>
            <el-radio :label="4">审核通过</el-radio>
            <el-radio :label="5">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select placeholder="请选择活动区域" v-model="searchParams.channel_id">
            <el-option label="所有频道" value></el-option>
            <el-option label="区域二" value="two"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchParams.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-button type="primary">提交</el-button>
    </div>

    <p>
      共找到
      <b>13</b> 条符合条件的内容
    </p>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" v-if="isInit" v-loading="loading">
      <el-table-column prop="cover" label="封面" width="200">
        <template slot-scope="scope">
          <img width="60" :src="scope.row.cover.images[0]" alt />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-tag>{{scope.row.status|formatStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pubdate" label="发布时间"></el-table-column>
      <el-table-column label="操作">
        <el-button size="small" plain type="primary">修改</el-button>
        <el-button size="small" plain type="danger">删除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :disabled="loading"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total"
      style="margin-top:10px"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "article1",
  data() {
    return {
      total: 0,
      isInit: false,
      loading: false,
      searchParams: {
        status: 1,
        channel_id: "",
        date: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    // 封装获取表格数据的方法
    loadTableData(page) {
      // 当页面一加载就获取数据 并且转换成对象
      let obj = JSON.parse(window.sessionStorage.getItem("user_info"));
      this.loading = true;
      // 发送axios
      this.$axios
        .get("/mp/v1_0/articles", {
          params: {
            page: page
          },
          headers: {
            Authorization: `Bearer ${obj.token}`
          }
        })
        .then(res => {
          // console.log(res);
          // 赋值表数据tableData
          this.tableData = res.data.data.results;
          // 赋值总条数
          this.total = res.data.data.total_count;
          this.isInit = true;
          this.loading = false;
        });
    },
    handleCurrentChange(page) {
      this.loadTableData(page);
    }
  },
  created() {
    this.loadTableData(1);
  },
  filters: {
    formatStatus(val) {
      // 通过switch判断
      switch (val) {
        case 0:
          return "草稿";
        case 1:
          return "待审核";
        case 2:
          return "审核通过";
        case 3:
          return "审核失败";
        case 4:
          return "已删除";
      }
    }
  }
};
</script>

<style>
</style>