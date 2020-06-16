<template>
  <div v-if="visible" class="content-login">
    <div class="content-login-left">
      <img :src="leftImgPath" />
    </div>
    <div class="content-login-right">
      <!-- 登录类型头部部分 -->
      <div class="content-top">
        <div :class="this.loginTpye === 1 ? 'content-top-type-focus' : ''">
          <el-button @click="loginTpyeClick(0)">需求方</el-button>
        </div>
        <div :class="this.loginTpye === 0 ? 'content-top-type-focus' : ''">
          <el-button @click="loginTpyeClick(1)">运算方</el-button>
        </div>
      </div>

      <div class="content-login-right-top">
        <div>{{ this.loginTpye === 0 ? '运算方登录' : '需求方登录'}}</div>
        <div>
          没有账号？立即
          <span @click="registry" class="click-title">注册</span>
        </div>
      </div>

      <!-- 登录主要部分 -->
      <div class="content-login-right-bottom content-form">
        <el-form :rules="loginRules" ref="loginForm" :show-message="false" :model="loginForm">
          <el-form-item prop="phoneNumber">
            <el-input
              v-model="loginForm.phoneNumber"
              prefix-icon="iconfont iconicon_stroke_svg_phone"
              placeholder="手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" style="margin-bottom: 10px">
            <el-input
              ref="password"
              v-model="loginForm.password"
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
          <el-form-item prop="autoLogin" style="margin-bottom: 10px;">
            <div class="auto-login">
              <div>
                <el-checkbox v-model="loginForm.autoLogin">7天内自动登录</el-checkbox>
              </div>
              <div>
                <span @click="forgetPassword" style="cursor: pointer;">忘记密码?</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <cover-button @click.native="handleLogin">登录</cover-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import coverButton from "@/components/button";
import { message } from "@/utils/utils";
import { validatePhoneNumber, validatePass } from "@/utils/validate";

const provideImg = require("@/assets/login_left_1.png");
const demanderImg = require("@/assets/login_left_2.png");

export default {
  name: "login",
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
    return {
      loginForm: {
        phoneNumber: "13597680151", // 手机号
        password: "135976", // 密码
        autoLogin: false // 自动登录
      },
      loginRules: {
        phoneNumber: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhoneNumber
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePass
          }
        ]
      },
      visible: false,
      loginTpye: 1, // 登录类型 0 运算放 1 需求方
      leftImgPath: demanderImg,
      passwordType: "password"
    };
  },
  watch: {
    viewType: function(newVal) {
      if (newVal == 0) {
        this.visible = true;
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
    loginTpyeClick(type) {
      this.leftImgPath = type === 0 ? demanderImg : provideImg;
      this.loginTpye = type === 0 ? 1 : 0;
      this.$emit("update:role", this.loginTpye);
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid, field) => {
        if (valid) {
          let param = {
            phone: this.loginForm.phoneNumber,
            password: this.loginForm.password,
            roleCode: this.loginTpye == 0 ? "supplier" : "consumer"
          };

          this.$store
            .dispatch("Login", param)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              console.log("登录失败");
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
    registry() {
      this.visible = false;
      this.$emit("update:viewType", 1);
    },
    forgetPassword() {
      this.visible = false;
      this.$emit("update:viewType", 2);
    }
  }
};
</script>

<style>
.content-login {
  width: 560px;
  height: 400px;
  border-radius: 2px;
  background: #505264;
  border: 1px solid #00ff87;
  box-shadow: 0px 0px 4px 0 #000817;
  display: flex;
  justify-content: space-between;
}

.content-login .content-top {
  margin-bottom: 20%;
}

.content-login-left {
  width: 50%;
  height: 100%;
}

.content-login-right {
  width: 46%;
  height: 100%;
  padding-left: 3%;
  color: #ffffff;
  padding-right: 3%;
}

.content-login-right-top {
  display: flex;
  justify-content: space-between;
}

.content-login-right-bottom {
  margin-top: 5%;
}

.auto-login {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.iconarrow_stroke_svg_right {
  font-size: 12px;
}

.registry {
  color: #00ff87;
  cursor: pointer;
}
</style>