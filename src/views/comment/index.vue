<template>
  <div>
    <el-table v-loading="isLoding" :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="comment_count" label="评论状态" width="180">
        <template slot-scope="scope">{{scope.row.comment_status?"正常":"关闭"}}</template>
      </el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="评论粉丝数"></el-table-column>
      <el-table-column prop="address" label="允许评论">
        <template slot-scope="scope">
          <el-switch
            @change="turn(scope.row)"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      :current-page 当前页
          :page-size 页容量
          :page-sizes 设置你有多少个页容量可以选择
          :tatal 总数据条数

          @size-change：页容量改变
          @current-change：页码改变
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40,50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="isLoding"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      isLoding:false
    };
  },
  methods: {
    turn(row){
      // 发送axios请求告诉服务器状态改了
      this.$axios
       .put("/mp/v1_0/comments/status?article_id=" + row.id,{
        allow_comment:row.comment_status
      }).then(res=>{
        // 这样就告诉服务器我的评论状态改变了不需要做其他操作
        // console.log(res);
      })
    },
    loadData() {
      //发送请求获取所有数据
      this.isLoding=true
      this.$axios
        .get("/mp/v1_0/articles", {
          params: {
            page: this.page,
            per_page: this.pageSize,
            response_type: "comment"
          }
        })
        .then(res => {
          // console.log(res);
          // 把这个数速直接赋值
          this.tableData = res.data.data.results;
          // 赋值总页码
          this.total = res.data.data.total_count;
          this.isLoding=false
        });
    },
    // 他会传过来参数页容量改的是多少
    handleSizeChange(size){
      // alert(size)
      this.pageSize=size
      this.loadData()
    },
    // 他会传过来参数page页码是多少
    handleCurrentChange(page){
      // alert(page)
      this.page=page
      this.loadData()
    }
  },
  created() {
    // 一进页面就发送axios
    this.loadData();
  }
};
</script>

<style>
</style>