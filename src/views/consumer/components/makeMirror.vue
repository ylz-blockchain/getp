<template>
  <el-dialog
    title="如何制作镜像文件"
    :visible="makeMirrorVisible"
    :before-close="handleClose"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    :icon="false"
    width="60%"
  >
    <div class="make-mirror">
      镜像文件制作图文教程
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "make-mirror",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      makeMirrorVisible: false
    };
  },
  watch: {
    visible(newVal) {
      this.makeMirrorVisible = newVal;
    }
  },
  methods: {
    handleClose() {
      this.makeMirrorVisible = false;
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style>
.make-mirror {
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
}
</style>