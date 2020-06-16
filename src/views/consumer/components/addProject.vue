<template>
  <el-drawer
    title="新增项目"
    :modal="false"
    :visible="drawer"
    :close-on-press-escape="false"
    :direction="direction"
    :before-close="handleClose"
  >
    <div class="add-project">
      <el-form
        :rules="addProjectRules"
        ref="addProjectForm"
        :show-message="false"
        :model="addProjectForm"
      >
        <div>项目名称</div>
        <el-form-item prop="projectName">
          <el-input
            @input="handleProjectNameChange"
            v-model="addProjectForm.projectName"
            placeholder="请输入项目名"
          ></el-input>
          <span v-if="clearable" class="clear-name" @click="clearName">
            <i class="iconfont iconicon_fill_svg_clear"></i>
          </span>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import coverButton from "@/components/button";

export default {
  name: "add-project",
  components: { coverButton },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      addProjectForm: {
        projectName: undefined
      },
      clearable: false,
      addProjectRules: {}
    };
  },
  watch: {
    visible(newVal) {
      this.drawer = newVal;
    }
  },
  methods: {
    handleClose() {
      this.drawer = false;
      this.$emit("update:visible", false);
    },
    clearName() {
      this.addProjectForm.projectName = undefined;
      this.clearable = false;
    },
    handleProjectNameChange() {
      this.$nextTick(() => {
        if (this.addProjectForm.projectName != undefined && this.addProjectForm.projectName != '') {
          this.clearable = true;
        } else {
          this.clearable = false;
        }
      });
    }
  }
};
</script>

<style>
.el-drawer.rtl {
  background: #505264;
  top: 64px !important;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
    0 16px 24px 2px rgba(0, 0, 0, 0.14);
  border-top: solid 1px rgba(255, 255, 255, 0.2);
  width: 25% !important;
}

.el-drawer__header {
  color: #ffffff !important;
  font-size: 16px;
  padding: 10px 5% 10px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

:focus {
  outline: 0;
}

.el-drawer__body {
  margin-left: 5%;
  color: #ffffff;
  margin-right: 5%;
}

.add-project {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.add-project .el-input__inner {
  color: #ffffff;
  border: 1px solid #585866;
  height: 30px;
  background: rgba(39, 38, 50, 0.1);
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #ffffff;
}

.clear-name {
  position: absolute;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}

.iconicon_fill_svg_clear {
  font-size: 8px !important;
  color: #ffffff;
}
</style>