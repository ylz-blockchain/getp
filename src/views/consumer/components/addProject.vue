<template>
  <el-drawer
    title="新增项目"
    :modal="false"
    :visible="drawer"
    :close-on-press-escape="false"
    :wrapperClosable="false"
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

        <div>镜像上传</div>
        <el-form-item prop="projectFile" class="add-project-mirror">
          <div>
            <el-upload
              v-model="addProjectForm.projectFile"
              class="avatar-uploader"
              :show-file-list="false"
              action
              :before-upload="beforeUpload"
              :http-request="uploadMirror"
            >
              <el-button>选择文件</el-button>
              <div slot="tip" class="el-upload__tip">您还未选择任何镜像文件</div>
            </el-upload>
          </div>
          <div class="add-project-mirror-content">
            <span @click="handleMakeMirror" class="add-project-content-click">如何制作镜像文件</span>
          </div>
        </el-form-item>

        <div>验证码</div>
        <el-form-item prop="verifyCode" class="add-project-verify">
          <div>
            <el-input v-model="addProjectForm.verifyCode" placeholder="请输入验证码" />
          </div>
          <div class="add-project-verify-image">
            <img @click="verifyCodeClick" :src="verifyCodeImage" />
          </div>
        </el-form-item>

        <el-form-item>
          <cover-button @click.native="handleUploadTask">上传任务</cover-button>
        </el-form-item>

        <make-mirror :visible.sync="makeMirrorVisible" />
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import coverButton from "@/components/button";
import makeMirror from "./makeMirror";
import { randomImage } from "@/api/admin/user";

export default {
  name: "add-project",
  components: { coverButton, makeMirror },
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
        projectName: undefined,
        projectFile: undefined,
        verifyCode: undefined
      },
      verifyCodeImage: undefined,
      verifyCodeTime: undefined,
      makeMirrorVisible: false,
      clearable: false,
      addProjectRules: {
        projectName: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: ["blur"]
          }
        ],
        verifyCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["blur"]
          }
        ]
      }
    };
  },
  watch: {
    visible(newVal) {
      this.drawer = newVal;
    }
  },
  created() {
    this.createVerifyCode();
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
    createVerifyCode() {
      this.verifyCodeTime = new Date().getTime();

      randomImage(this.verifyCodeTime)
        .then(response => {
          this.verifyCodeImage = response;
        })
        .catch(() => {
          message("获取验证码失败", "error");
        });
    },
    verifyCodeClick() {
      this.createVerifyCode();
    },
    handleProjectNameChange() {
      this.$nextTick(() => {
        if (
          this.addProjectForm.projectName != undefined &&
          this.addProjectForm.projectName != ""
        ) {
          this.clearable = true;
        } else {
          this.clearable = false;
        }
      });
    },
    beforeUpload(file) {
      const isZip = file.type === "application/x-zip-compressed";
      if (!isZip) {
        this.$message.error("上传的文件只能是 ZIP 格式!");
      }

      return isZip;
    },
    uploadMirror(file) {
      // 上传镜像
    },
    handleMakeMirror() {
      this.makeMirrorVisible = true;
    },
    handleUploadTask() {}
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
  width: 30% !important;
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

.add-project .el-dialog__header,
.add-project .el-dialog__footer,
.add-project .el-dialog__body {
  background: #505264;
}

.add-project .el-dialog__header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.add-project .el-dialog__title {
  font-size: 13px;
  color: #ffffff;
}

.add-project .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
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

.add-project-mirror .el-form-item__content {
  display: flex;
  justify-content: flex-start;
}

.add-project-mirror .el-form-item__content > div {
  display: flex;
}

.add-project-mirror .el-form-item__content > div:first-child {
  width: 65%;
  justify-content: flex-start;
}

.add-project-mirror .add-project-mirror-content {
  width: 35%;
  justify-content: flex-end;
}

.add-project-mirror .avatar-uploader {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.add-project-mirror .el-upload__tip {
  color: #ffffff;
  margin-top: 0px;
  margin-left: 12px;
  font-size: 12px;
}

.add-project-content-click {
  color: #00ff87;
  cursor: pointer;
  font-size: 12px;
}

.add-project-verify .el-form-item__content {
  display: flex;
  justify-content: flex-start;
}

.add-project-verify .el-form-item__content > div {
  width: 35%;
}

.add-project-verify .el-input__inner {
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.add-project-verify-image {
  display: flex;
  align-items: center;
  margin-left: 12px;
}

.add-project-verify-image > img {
  height: 30px;
}
</style>