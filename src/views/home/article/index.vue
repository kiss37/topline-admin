<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="searchParams">
        <el-form-item label="状态">
          <el-radio-group v-model="searchParams.status">
            <el-radio label>全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select placeholder="请选择活动区域" v-model="searchParams.channel_id">
            <el-option label="所有频道" value></el-option>
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="searchParams.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="doSearch">筛选</el-button>
    </div>

    <p>
      共找到
      <b>{{total}}</b> 条符合条件的内容
    </p>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
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
      <el-table-column label="操作" slot-scope>
        <template slot-scope="scope">
          <el-button size="small" plain type="primary">修改</el-button>
          <el-button size="small" plain type="danger" @click="doDel(scope.row)">删除</el-button>
        </template>
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
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "article1",
  data() {
    return {
      total: 0,
      loading: false,
      channelList: [],
      searchParams: {
        status: "",
        channel_id: "",
        date: ""
      },
      tableData: []
    };
  },
  methods: {
    doDel(row) {
      console.log(row);
      
      this.$confirm("确定要删除?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/mp/v1_0/articles/${row.id}`).then(res => {
            // 提示
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
            // 重新加载数据
            this.loadTableData(1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    doSearch() {
      this.loadTableData(1);
    },
    // 封装获取表格数据的方法
    loadTableData(page) {
      // 当页面一加载就获取数据 并且转换成对象
      let obj = JSON.parse(window.sessionStorage.getItem("user_info"));
      // 发送请求让他转圈圈
      this.loading = true;

      // 获取状态和域的值
      const status =
        this.searchParams.status === "" ? undefined : this.searchParams.status;
      const channel_id =
        this.searchParams.channel_id === ""
          ? undefined
          : this.searchParams.channel_id;

      // 发送axios
      this.$axios
        .get("/mp/v1_0/articles", {
          params: {
            status,
            channel_id,
            begin_pubdate: this.searchParams.date[0],
            end_pubdate: this.searchParams.date[1],
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
          this.loading = false;
        });
    },
    handleCurrentChange(page) {
      this.loadTableData(page);
    }
  },
  created() {
    this.loadTableData(1);
    // 一进来发送请求获取所有类别
    this.$axios.get(`/mp/v1_0/channels`).then(res => {
      // console.log(res);
      this.channelList = res.data.data.channels;
    });
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