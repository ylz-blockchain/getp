<template>
  <div class="content-registry" v-if="visible">
    <div class="content-registry-left">
      <img :src="leftImgPath" />
      <div class="content-registry-left-word">
        <div v-if="this.loginTpye === 1">
          <span>超算地球-运算中心</span>
          <span>你的需求</span>
          <span>有无数人为你提供算力</span>
        </div>
        <div v-else>
          <span>超算地球-算力集中营</span>
          <span>让每个人的闲置设备联合发挥作用</span>
        </div>
      </div>
    </div>

    <div class="content-registry-right">
      <!-- 登录类型头部部分 -->
      <div class="content-top">
        <div :class="this.loginTpye === 1 ? 'content-top-type-focus' : ''">
          <el-button @click="loginTpyeClick(0)">需求方</el-button>
        </div>
        <div :class="this.loginTpye === 0 ? 'content-top-type-focus' : ''">
          <el-button @click="loginTpyeClick(1)">运算方</el-button>
        </div>
      </div>

      <!-- 注册中间部分 -->
      <div class="content-registry-right-top">
        <div>注册</div>
        <div>
          已有账号？立即
          <span @click="login" class="click-title">登录</span>
        </div>
      </div>

      <!-- 注册底部部分 -->
      <div class="content-registry-right-bottom content-form">
        <el-form
          ref="registryForm"
          :rules="registryRules"
          :show-message="false"
          :model="registryForm"
        >
          <el-form-item prop="phoneNumber">
            <el-input
              v-model="registryForm.phoneNumber"
              prefix-icon="iconfont iconicon_stroke_svg_phone"
              placeholder="手机号"
            ></el-input>
          </el-form-item>
          <div class="registry-verify-code">
            <el-form-item prop="verifyCode">
              <el-input
                v-model="registryForm.verifyCode"
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
              v-model="registryForm.password"
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
              v-model="registryForm.passwordSecond"
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

          <el-form-item style="height: 35px" prop="userProtocol">
            <el-checkbox v-model="registryForm.userProtocol">已阅读并同意</el-checkbox>
            <span class="user-protocol">用户协议</span>
          </el-form-item>

          <el-form-item class="submit">
            <cover-button @click.native="register">注册</cover-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import coverButton from "@/components/button";
import { sms, register } from "@/api/admin/login";
import { message } from "@/utils/utils";
import { validatePhoneNumber, validatePass } from "@/utils/validate";

const provideImg = require("@/assets/registry_left_1.png");
const demanderImg = require("@/assets/registry_left_2.png");

export default {
  name: "registry",
  components: { coverButton },
  data() {
    let validatePassSecond = (rule, value, callback) => {
      // 验证2次密码是否相等
      if (value !== this.registryForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        validatePass(rule, value, callback);
      }
    };

    return {
      registryForm: {
        phoneNumber: "", // 手机号
        verifyCode: "", // 验证码
        password: "", // 密码
        passwordSecond: "", // 二次密码
        userProtocol: true // 用户协议
      },
      registryRules: {
        phoneNumber: [{ validator: validatePhoneNumber, trigger: ["blur"] }],
        verifyCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["blur"]
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwordSecond: [{ validator: validatePassSecond, trigger: ["blur"] }]
      },
      validCodeAble: false,
      loginTpye: 1, // 登录类型 0 运算放 1 需求方
      visible: false,
      leftImgPath: demanderImg,
      passwordType: "password",
      passwordSecondType: "password"
    };
  },
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
  watch: {
    viewType: function(newVal) {
      if (newVal == 1) {
        this.visible = true;
        this.resetForm();
      } else {
        this.visible = false;
      }
    },
    role: function(newVal) {
      this.leftImgPath = newVal === 0 ? demanderImg : provideImg;
      this.loginTpye = newVal;
    }
  },
  mounted() {
    this.leftImgPath = this.role === 0 ? demanderImg : provideImg;
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
    loginTpyeClick(type) {
      this.leftImgPath = type === 0 ? demanderImg : provideImg;
      this.loginTpye = type === 0 ? 1 : 0;
      this.$emit("update:role", this.loginTpye);
    },
    sendValidCode() {
      // 发送验证码
      if (this.validCodeAble) {
        return;
      }

      let errorMessage = undefined;
      if (
        this.registryForm.phoneNumber == undefined ||
        this.registryForm.phoneNumber === ""
      ) {
        errorMessage = "手机号不能为空";
      } else {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!reg.test(this.registryForm.phoneNumber)) {
          errorMessage = "手机格式输入不正确";
        }
      }
      if (errorMessage != undefined) {
        message(errorMessage, "error");
        return;
      }

      var param = {
        phone: this.registryForm.phoneNumber,
        smsMode: 1
      };
      sms(param).then(response => {
        message("验证码发送成功", "success");
        this.validCodeAble = true;
        this.registryForm.verifyCode = response;
      });
    },
    register() {
      // 注册
      this.$refs.registryForm.validate((valid, field) => {
        if (!this.registryForm.userProtocol) {
          message("请同意用户协议", "warning");
          return;
        }

        if (valid) {
          let param = {
            phone: this.registryForm.phoneNumber,
            smsCode: this.registryForm.verifyCode,
            password: this.registryForm.password,
            roleCode: this.loginTpye == 0 ? "supplier" : "consumer"
          };

          register(param)
            .then(response => {
              message("注册成功", "success");
              this.login();
            })
            .catch(() => {
              message("注册失败", "error");
              this.validCodeAble = false;
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
      this.registryForm = {
        phoneNumber: "", // 手机号
        verifyCode: "", // 验证码
        password: "", // 密码
        passwordSecond: "", // 二次密码
        userProtocol: true // 用户协议
      };
      this.validCodeAble = false;
    }
  }
};
</script>

<style>
.content-registry {
  width: 560px;
  height: 400px;
  border-radius: 2px;
  background: #505264;
  border: 1px solid #00ff87;
  box-shadow: 0px 0px 4px 0 #000817;
  display: flex;
  justify-content: space-between;
}

.content-registry .content-top {
  margin-bottom: 10%;
}

.content-registry-left {
  width: 50%;
  height: 100%;
  position: relative;
}

.content-registry-left-word {
  position: absolute;
  bottom: 6%;
  z-index: 999;
  left: 6%;
  color: rgba(255, 255, 255, 0.8);
  height: 20%;
}

.content-registry-left-word > div {
  display: flex;
  flex-direction: column;
}

.content-registry-left-word span {
  margin-bottom: 10%;
}

.content-registry-right {
  width: 46%;
  height: 100%;
  padding-left: 5%;
  color: #ffffff;
  padding-right: 2%;
}

.content-registry-right-top {
  display: flex;
  justify-content: space-between;
}

.content-registry-right-bottom {
  margin-top: 5%;
}

.registry-verify-code {
  display: flex;
  justify-content: space-between;
}

.registry-verify-code .el-form-item:first-child {
  width: 45%;
}

.registry-verify-code .el-form-item:last-child {
  width: 50%;
}

.content-registry-right-bottom .el-form-item {
  margin-bottom: 10px !important;
}

.show-pwd {
  position: absolute;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}

.user-protocol {
  color: #00ff87;
  font-size: 12px;
  cursor: pointer;
}
</style>