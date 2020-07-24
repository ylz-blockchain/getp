<template>
  <el-dialog
    :visible="changePasswordVisible"
    :before-close="handleClose"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    :show-close="false"
    :icon="false"
    top="30vh"
    width="40%"
  >
    <div class="change-password">
      <div>修改密码</div>
      <div>
        <el-form ref="changeForm" :rules="changeRules" :show-message="false" :model="changeForm">
          <el-form-item prop="phoneNumber">
            <el-input
              v-model="changeForm.phoneNumber"
              prefix-icon="iconfont iconicon_stroke_svg_phone"
              placeholder="手机号"
            ></el-input>
          </el-form-item>
          <div class="change-verify-code">
            <el-form-item prop="verifyCode">
              <el-input
                v-model="changeForm.verifyCode"
                prefix-icon="iconfont iconicon_stroke_svg_code"
                placeholder="验证码"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <cover-button @click.native="sendValidCode" :disabled.sync="validCodeAble">发送短信验证码</cover-button>
            </el-form-item>
          </div>

          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="changeForm.password"
              :type="passwordType"
              prefix-icon="iconfont iconicon_stroke_svg_password"
              placeholder="密码"
            ></el-input>
            <span class="show-pwd" @click="showPwd">
              <i
                :class="passwordType === 'password' ? 'iconfont iconicon_stroke_svg_hide':'iconfont iconicon_stroke_svg_show'"
              ></i>
            </span>
          </el-form-item>

          <el-form-item prop="passwordSecond">
            <el-input
              ref="passwordSecond"
              v-model="changeForm.passwordSecond"
              :type="passwordSecondType"
              prefix-icon="iconfont iconicon_stroke_svg_password"
              placeholder="再次输入密码"
            ></el-input>
            <span class="show-pwd" @click="showPwdSecond">
              <i
                :class="passwordSecondType === 'password' ? 'iconfont iconicon_stroke_svg_hide':'iconfont iconicon_stroke_svg_show'"
              ></i>
            </span>
          </el-form-item>

          <el-form-item class="submit">
            <cover-button @click.native="resetPassword">重置密码</cover-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import coverButton from "@/components/button";
import { sms, changePassword } from "@/api/admin/login";
import { message } from "@/utils/utils";
import { validatePhoneNumber, validatePass } from "@/utils/validate";

export default {
  name: "change-password",
  components: { coverButton },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      required: true
    }
  },
  data() {
    let validatePassSecond = (rule, value, callback) => {
      // 验证2次密码是否相等
      if (value !== this.changeForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        validatePass(rule, value, callback);
      }
    };

    return {
      changePasswordVisible: false,
      changeForm: {
        phoneNumber: "", // 手机号
        verifyCode: "", // 验证码
        password: "", // 密码
        passwordSecond: "" // 二次密码
      },
      changeRules: {
        phoneNumber: [{ validator: validatePhoneNumber, trigger: ["blur"] }],
        verifyCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["change"]
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwordSecond: [{ validator: validatePassSecond, trigger: ["blur"] }]
      },
      validCodeAble: false, // 发送验证码按钮是否可点击
      passwordType: "password",
      passwordSecondType: "password"
    };
  },
  watch: {
    visible(newVal) {
      this.changePasswordVisible = newVal;
    }
  },
  mounted() {
    this.changeForm.phoneNumber = this.phone;
  },
  methods: {
    handleClose() {
      this.changePasswordVisible = false;
      this.$emit("update:visible", false);
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    showPwdSecond() {
      if (this.passwordSecondType === "password") {
        this.passwordSecondType = "";
      } else {
        this.passwordSecondType = "password";
      }
      this.$nextTick(() => {
        this.$refs.passwordSecond.focus();
      });
    },
    sendValidCode() {
      // 发送验证码
      if (this.validCodeAble) {
        return;
      }

      let errorMessage = undefined;
      if (
        this.changeForm.phoneNumber == undefined ||
        this.changeForm.phoneNumber === ""
      ) {
        errorMessage = "手机号不能为空";
      } else {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!reg.test(this.changeForm.phoneNumber)) {
          errorMessage = "手机格式输入不正确";
        }
      }
      if (errorMessage != undefined) {
        message(errorMessage, "error");
        return;
      }

      var param = {
        phone: this.changeForm.phoneNumber,
        smsMode: 2
      };
      sms(param).then(response => {
        message("验证码发送成功", "success");
        this.validCodeAble = true;
        this.changeForm.verifyCode = response;
      });
    },
    resetPassword() {
      // 重置密码
      this.$refs.changeForm.validate((valid, field) => {
        if (valid) {
          let param = {
            phone: this.changeForm.phoneNumber,
            smsCode: this.changeForm.verifyCode,
            password: this.changeForm.password,
            roleCode: this.loginTpye == 0 ? "supplier" : "consumer"
          };

          changePassword(param)
            .then(response => {
              message("重置密码成功", "success");
              this.handleClose();
            })
            .catch(() => {
              message("重置密码失败", "error");
            });
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
    resetForm() {
      this.changeForm = {
        phoneNumber: "", // 手机号
        verifyCode: "", // 验证码
        password: "", // 密码
        passwordSecond: "" // 二次密码
      };
      this.validCodeAble = false;
    }
  }
};
</script>

<style>
.change-password {
  display: flex;
  flex-direction: column;
  color: #ffffff;
}

.change-password > div {
  margin-bottom: 12px;
}

.change-password .show-pwd {
  position: absolute;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}

.change-password .el-input__inner {
  border-radius: 2px;
  border: 1px solid rgba(160, 150, 150, 0.5);
  font-size: 12px;
  height: 40px !important;
  color: #ffffff;
  background: #505264;
}

.change-verify-code {
  display: flex;
  justify-content: space-between;
}

.change-verify-code .el-form-item:first-child {
  width: 65%;
}

.change-verify-code .el-form-item:last-child {
  width: 30%;
}

.change-password .el-button {
  border-radius: 2px;
  background: #00ff87;
  color: #272632;
  border: none;
  height: 40px;
  font-family: Noto Sans SC;
  font-size: 13px;
  font-weight: 400;
  width: 100%;
}

.change-password .el-button.el-button--primary.is-disabled {
  background: rgba(0,255,135, 0.8);
  border-color: #00ff87;
  color: #272632;
}

.change-password .el-button--primary:focus,
.change-password .el-button--primary:hover {
  background: #00ff87;
  border-color: #00ff87;
  color: #272632;
}
</style>