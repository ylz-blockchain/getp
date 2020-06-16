<template>
  <div>
    <el-button :disabled="isDisable" type="primary"><slot>按钮</slot></el-button>
    <div class="cover"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDisable: false
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    disabled(newVal) {
      this.isDisable = newVal;
    }
  }
}
</script>

<style scoped>
.cover {
  display: none;
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

.el-button--primary:focus+.cover {
  display: block;
}
</style>