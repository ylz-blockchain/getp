<template>
  <div class="main">
    <!-- 头部导航 -->
    <navbar :visible.sync="showProfile" />
    <!-- 主体 -->
    <app-main />
    <!-- 个人资料 -->
    <profile :visible.sync="showProfile" />
  </div>
</template>

<script>
import navbar from "./navbar";
import appMain from "./appMain";
import profile from "@/views/profile";

export default {
  name: "index",
  components: { navbar, appMain, profile },
  data() {
    return {
      showProfile: false
    };
  },
  mounted() {
    // 检验当前屏幕大小
    // this.NET.verifyScreenWidth();
  }
};
</script>

<style>
.main {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>