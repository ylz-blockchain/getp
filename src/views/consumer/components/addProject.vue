<template>
  <el-drawer
    :title="action != 2 ? '新增项目' : '选择运算配置'"
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
        <!-- 填写基本信息 -->
        <template v-if="action != 2">
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

          <div>常用邮箱</div>
          <el-form-item prop="email">
            <el-input v-model="addProjectForm.email" placeholder="请输入您的常用邮箱"></el-input>
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
                <div
                  slot="tip"
                  class="el-upload__tip"
                >{{ addProjectForm.projectFile === undefined ? '您还未选择任何镜像文件' : addProjectForm.projectFile.name}}</div>
              </el-upload>
            </div>
            <div class="add-project-mirror-content">
              <span @click="handleMakeMirror" class="add-project-content-click">如何制作镜像文件</span>
            </div>
          </el-form-item>
          <make-mirror :visible.sync="makeMirrorVisible" />

          <div>验证码</div>
          <el-form-item prop="verifyCode" class="add-project-verify">
            <div>
              <el-input v-model="addProjectForm.verifyCode" placeholder="请输入验证码" />
            </div>
            <div class="add-project-verify-image">
              <img @click="verifyCodeClick" :src="verifyCodeImage" />
            </div>
          </el-form-item>
        </template>

        <!-- 选择配置 -->
        <template v-else>
          <div class="add-project-config-item">
            <div>运算价格：</div>
            <div>{{ addProjectForm.projectPrice }}元</div>
          </div>

          <div class="add-project-config-item">
            <div>账户余额：</div>
            <div class="add-project-config-item-up">
              <span>￥{{ userPrice }}</span>
              <span @click="handlePay">充值</span>
            </div>
          </div>

          <div class="add-project-config-item">
            <div>配置参数：</div>
            <div>以下为推荐参数，可根据需求选择不同运算参数。</div>
          </div>

          <div class="add-project-config-item">
            <div>内存需求：</div>
            <div>
              <el-select
                @change="handleParamChange"
                v-model="addProjectForm.memory"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in memoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>

          <div class="add-project-config-item">
            <div>CPU需求：</div>
            <div>
              <el-select @change="handleParamChange" v-model="addProjectForm.cpu" placeholder="请选择">
                <el-option
                  v-for="item in cpuOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>

          <div class="add-project-config-item">
            <div>储存需求：</div>
            <div>
              <el-select
                @change="handleParamChange"
                v-model="addProjectForm.store"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in storeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>

          <div class="add-project-config-item">
            <div>GPU需求：</div>
            <div>
              <el-select @change="handleParamChange" v-model="addProjectForm.gpu" placeholder="请选择">
                <el-option
                  v-for="item in gpuOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>

          <el-form-item prop="calculate" class="add-project-config-item">
            <div>运算时长：</div>
            <div>
              <el-input v-model="addProjectForm.calculate" placeholder="请输入运算时长（单位/天）" />
            </div>
          </el-form-item>

          <pay :visible.sync="payVisible" />
        </template>

        <div v-if="action == 1">镜像文件上传中{{ uploadProcess }}%</div>
        <el-form-item class="add-project-submit">
          <cover-button v-if="action === 0" @click.native="handleUploadTask">上传任务</cover-button>
          <el-progress
            v-if="action === 1"
            :show-text="false"
            :percentage="uploadProcess"
            status="success"
          ></el-progress>
          <cover-button v-if="action === 2" @click.native="createProject">确认创建项目</cover-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import coverButton from "@/components/button";
import makeMirror from "./makeMirror";
import { message } from "@/utils/utils";
import { randomImage } from "@/api/admin/user";
import { validateEmail } from "@/utils/validate";
import pay from "@/views/pay";
import { checkCaptcha } from "@/api/admin/user";

export default {
  name: "add-project",
  components: { coverButton, makeMirror, pay },
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
      action: 0,
      addProjectForm: {
        projectName: "测试项目",
        email: "1179438473@qq.com",
        projectFile: undefined,
        verifyCode: undefined,
        projectPrice: 0,
        memory: "32G",
        cpu: "2.8GHz 四核",
        store: "27G",
        gpu: "无",
        calculate: undefined
      },
      memoryOptions: [
        {
          value: 100,
          label: "32G"
        }
      ],
      cpuOptions: [
        {
          value: 100,
          label: "2.8GHz 四核"
        },
        {
          value: 120,
          label: "2.9GHz 四核"
        }
      ],
      storeOptions: [
        {
          value: 300,
          label: "27G"
        }
      ],
      gpuOptions: [
        {
          value: 200,
          label: "无"
        }
      ],
      userPrice: 2000,
      uploadProcess: 0,
      verifyCodeImage: undefined,
      verifyCodeTime: undefined,
      makeMirrorVisible: false,
      payVisible: false,
      clearable: false,
      addProjectRules: {
        projectName: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: ["blur"]
          }
        ],
        email: [
          {
            required: true,
            trigger: "blur",
            validator: validateEmail
          }
        ],
        verifyCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["blur"]
          }
        ],
        calculate: [
          {
            required: true,
            message: "请输入运算时长",
            trigger: ["blur"]
          },
          {
            pattern: /(^[1-9]\d*$)/,
            message: "请输入正整数天数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    visible(newVal) {
      this.drawer = newVal;
      this.reset();
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
        message("上传的文件只能是 ZIP 格式!", "error");
      }

      return isZip;
    },
    uploadMirror(file) {
      this.addProjectForm.projectFile = file.file;
    },
    handleMakeMirror() {
      this.makeMirrorVisible = true;
    },
    handlePay() {
      this.payVisible = true;
    },
    handleUploadTask() {
      this.$refs.addProjectForm.validate((valid, field) => {
        if (valid) {
          if (!this.addProjectForm.projectFile) {
            message("请选择需要上传的文件", "error");
          }

          let validCodeParam = {
            captcha: this.addProjectForm.verifyCode,
            checkKey: this.verifyCodeTime
          };

          checkCaptcha(validCodeParam)
            .then(res => {
              this.action = 1;
              // 请求参数
              var formData = new FormData();
              // 文件
              formData.append("file", this.addProjectForm.projectFile);
              let _this = this;

              this.$http({
                url: "/jeecg-boot/science/task/upload",
                method: "post",
                data: formData,
                onUploadProgress: function(progressEvent) {
                  let complete =
                    ((progressEvent.loaded / progressEvent.total) * 100) | 0;

                  _this.uploadProcess = complete;
                  if (_this.uploadProcess == 100) {
                    _this.action = 2;
                  }
                }
              })
                .then(res => {})
                .catch(err => {});
            })
            .catch();
        } else {
          let errorMessage = "";
          for (let item in field) {
            errorMessage = field[item][0].message;
            break;
          }
          message(errorMessage, "error");

          return false;
        }
      });
    },
    handleParamChange() {
      this.addProjectForm.projectPrice =
        this.addProjectForm.memory +
        this.addProjectForm.cpu +
        this.addProjectForm.store +
        this.addProjectForm.gpu;
    },
    createProject() {
      this.$refs.addProjectForm.validate((valid, field) => {
        if (valid) {
          this.$emit("handleSuccess");
          this.handleClose();
        } else {
          let errorMessage = "";
          for (let item in field) {
            errorMessage = field[item][0].message;
            break;
          }
          message(errorMessage, "error");

          return false;
        }
      });
    },
    reset() {
      this.action = 0;
      this.addProjectForm = {
        projectName: "测试项目",
        email: "1179438473@qq.com",
        projectFile: undefined,
        verifyCode: undefined,
        projectPrice: 0,
        memory: "32G",
        cpu: "2.8GHz 四核",
        store: "27G",
        gpu: "无",
        calculate: undefined
      };
      this.uploadProcess = 0;
      this.clearable = false;
      this.createVerifyCode();
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
  width: 30% !important;
}

.el-drawer__header {
  color: #ffffff !important;
  font-size: 16px;
  padding: 10px 2% 10px !important;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

:focus {
  outline: 0;
}

.el-drawer__body {
  margin-left: 5%;
  color: rgba(255, 255, 255, 0.8);
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
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.add-project ::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.4) !important;
}

.add-project ::-moz-placeholder {
  color: rgba(255, 255, 255, 0.4) !important;
}

.add-project :-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.4) !important;
}

.add-project .el-progress.is-success .el-progress-bar__inner {
  background-color: #00ff87;
}

.add-project .el-progress-bar__outer {
  background-color: #3d3c46;
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

.add-project-mirror {
  margin-top: 5px;
}

.add-project-mirror .el-form-item__content {
  display: flex;
  justify-content: flex-start;
}

.add-project-mirror .el-form-item__content > div {
  display: flex;
}

.add-project-mirror .el-form-item__content > div:first-child {
  width: 70%;
  justify-content: flex-start;
}

.add-project-mirror .add-project-mirror-content {
  width: 30%;
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

.add-project-submit {
  margin-top: 10px;
}

.add-project-config-item {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5%;
}

.add-project-config-item > div {
  display: flex;
  align-items: center;
}

.add-project-config-item .el-form-item__content {
  flex: 1 !important;
  font-size: 13px;
}

.add-project-config-item > div:first-child,
.add-project-config-item .el-form-item__content > div:first-child {
  flex: 0.18;
}
.add-project-config-item > div:last-child,
.add-project-config-item .el-form-item__content > div:last-child {
  flex: 0.82;
}

.add-project-config-item-up {
  display: flex;
  justify-content: space-between;
}

.add-project-config-item-up > span:last-child {
  color: #00ff87;
  cursor: pointer;
}

.add-project-config-item .el-select {
  width: 100%;
}

.add-project-config-item .el-input__inner {
  border: 1px solid rgba(255, 255, 255, 0.8);
  height: 35px;
}

.add-project-config-item .el-input__icon {
  line-height: 35px;
}
</style>