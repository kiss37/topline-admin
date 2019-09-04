<template>
  <el-select placeholder="请选择活动区域" v-model="channel_id">
    <el-option label="所有频道" value></el-option>
    <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "ttchannel",
  data() {
    return {
      channelList: [],
      channel_id: "",
    }
  },
  created() {
     // 一进来发送请求获取所有类别
    this.$axios.get(`/mp/v1_0/channels`).then(res => {
      // console.log(res);
      this.channelList = res.data.data.channels;
    });
  },
};
</script>

<style>
</style>