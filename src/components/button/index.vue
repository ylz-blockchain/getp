<template>
  <div>
    <el-button @click="handleClick" type="primary"><slot>按钮</slot></el-button>
    <div :style="{display: cover}" class="cover"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cover: 'none'
    }
  },
  methods: {
    handleClick() {
      if (this.cover == 'none') {
        this.cover = 'block';
      }
    }
  }
}
</script>

<style scoped>
.cover {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 99999;
  -moz-opacity: 0.1;
  opacity: 0.1;
  cursor: pointer;
  filter: alpha(opacity=10);
}
</style>