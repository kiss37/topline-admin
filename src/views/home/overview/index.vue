<template>
  <div>
    <el-card class="container-warp">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="card-box">
        <el-card class="box-card">
          <p>粉丝数</p>
          <p>50</p>
          <p>昨日敬赠：0</p>
        </el-card>
        <el-card class="box-card">
          <p>粉丝阅读累计阅读数</p>
          <p>3000</p>
          <p>阅读累计阅读数：0</p>
        </el-card>
        <el-card class="box-card">
          <p>月度粉丝收益</p>
          <p>1个亿</p>
          <p>月度累计收益：1个亿</p>
        </el-card>
      </div>
    </el-card>
    <el-card class="card-bottom">
      <div slot="header" class="clearfix">
        <span>数据分析</span>
      </div>
      <!-- 准备一个div放图表 -->
      <div ref="echartsBox" class="charts-box"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted() {
    var myChart = echarts.init(this.$refs.echartsBox);
    var option = {
      title: {
        text: "折线图堆叠"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    myChart.setOption(option);
  }
};
</script>

<style lang="less" scoped>
.container-warp {
  .card-box {
    display: flex;
    justify-content: space-around;
    .box-card {
      background-color: #f8f8f8;
      width: 350px;
      text-align: center;
    }
  }
}
.card-bottom {
  margin-top: 30px;
  .charts-box {
    height: 500px;
  }
}
</style>