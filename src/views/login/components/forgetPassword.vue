<template>
  <div class="content-forget" v-if="visible">
    <div class="content-forget-main">
      <!-- 登录类型头部部分 -->
      <div class="content-top">
        <div :class="this.loginTpye === 1 ? 'content-top-type-focus' : ''">
          <el-button @click="loginTpyeClick(0)">需求方</el-button>
        </div>
        <div :class="this.loginTpye === 0 ? 'content-top-type-focus' : ''">
          <el-button @click="loginTpyeClick(1)">运算方</el-button>
        </div>
      </div>

      <!-- 忘记密码头部部分 -->
      <div class="content-forget-main-top">
        <div>
          重置密码
          <span style="color: #00ff87">({{ this.loginTpye == 0 ? '运算方' : '需求方' }})</span>
        </div>
        <div>
          返回
          <span @click="login" class="click-title">登录</span>
        </div>
      </div>

      <!-- 忘记密码底部部分 -->
      <div class="content-forget-main-buttom content-form">
        <el-form ref="forgetForm" :rules="forgetRules" :show-message="false" :model="forgetForm">
          <el-form-item prop="phoneNumber">
            <el-input
              v-model="forgetForm.phoneNumber"
              prefix-icon="iconfont iconicon_stroke_svg_phone"
              placeholder="手机号"
            ></el-input>
          </el-form-item>
          <div class="forget-verify-code">
            <el-form-item prop="verifyCode">
              <el-input
                v-model="forgetForm.verifyCode"
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
              v-model="forgetForm.password"
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
              v-model="forgetForm.passwordSecond"
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
  </div>
</template>

<script>
import coverButton from "@/components/button";
import { sms, changePassword } from "@/api/admin/login";
import { message } from "@/utils/utils";
import { validatePhoneNumber, validatePass } from "@/utils/validate";

export default {
  name: "forget-password",
  components: { coverButton },
  props: {
    viewType: {
      type: Number,
      required: true
    },
    role: {
      type: Number,
      required: true
    }
  },
  data() {
    let validatePassSecond = (rule, value, callback) => {
      // 验证2次密码是否相等
      if (value !== this.forgetForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        validatePass(rule, value, callback);
      }
    };

    return {
      forgetForm: {
        phoneNumber: "", // 手机号
        verifyCode: "", // 验证码
        password: "", // 密码
        passwordSecond: "" // 二次密码
      },
      forgetRules: {
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
      loginTpye: 1, // 登录类型 0 运算放 1 需求方
      validCodeAble: false, // 发送验证码按钮是否可点击
      visible: false,
      passwordType: "password",
      passwordSecondType: "password"
    };
  },
  watch: {
    viewType: function(newVal) {
      if (newVal == 2) {
        this.visible = true;
        this.resetForm();
      } else {
        this.visible = false;
      }
    },
    role: function(newVal) {
      this.loginTpye = newVal;
    }
  },
  mounted() {
    this.loginTpye = this.role;
  },
  methods: {
    login() {
      this.visible = false;
      this.$emit("update:viewType", 0);
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
        this.forgetForm.phoneNumber == undefined ||
        this.forgetForm.phoneNumber === ""
      ) {
        errorMessage = "手机号不能为空";
      } else {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!reg.test(this.forgetForm.phoneNumber)) {
          errorMessage = "手机格式输入不正确";
        }
      }
      if (errorMessage != undefined) {
        message(errorMessage, "error");
        return;
      }

      var param = {
        phone: this.forgetForm.phoneNumber,
        smsMode: 2
      };
      sms(param).then(response => {
        message("验证码发送成功", "success");
        this.validCodeAble = true;
        this.forgetForm.verifyCode = response;
      });
    },
    resetPassword() {
      // 重置密码
      this.$refs.forgetForm.validate((valid, field) => {
        if (valid) {
          let param = {
            phone: this.forgetForm.phoneNumber,
            smsCode: this.forgetForm.verifyCode,
            password: this.forgetForm.password,
            roleCode: this.loginTpye == 0 ? "supplier" : "consumer"
          };

          changePassword(param)
            .then(response => {
              message("重置密码成功", "success");
              this.login();
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
    loginTpyeClick(type) {
      this.loginTpye = type === 0 ? 1 : 0;
      this.$emit("update:role", this.loginTpye);
    },
    resetForm() {
      this.forgetForm = {
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
.content-forget {
  width: 560px;
  height: 400px;
  border-radius: 2px;
  background: #505264;
  border: 1px solid #00ff87;
  box-shadow: 0px 0px 4px 0 #000817;
  display: flex;
  justify-content: space-between;
}

.content-forget .content-top {
  margin-bottom: 10%;
  width: 50%;
  margin-left: 50%;
}

.content-forget-main {
  color: #ffffff;
  margin-left: 5%;
  margin-right: 5%;
  width: 100%;
}

.content-forget-main-top {
  display: flex;
  margin-bottom: 5%;
  justify-content: space-between;
}

.forget-verify-code {
  display: flex;
  justify-content: space-between;
}

.content-forget-main-buttom .el-form-item {
  margin-bottom: 10px !important;
}

.forget-verify-code .el-form-item:first-child {
  width: 65%;
}

.forget-verify-code .el-form-item:last-child {
  width: 30%;
}
</style>