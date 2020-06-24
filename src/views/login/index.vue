<template>
  <div class="content">
    <!-- 登录 -->
    <login :viewType.sync="viewDialog" :role.sync="roleIdentity" />
    <!-- 注册 -->
    <registry :viewType.sync="viewDialog" :role.sync="roleIdentity" />
    <!-- 忘记密码 -->
    <forget-password :viewType.sync="viewDialog" :role.sync="roleIdentity" />
  </div>
</template>

<script>
import login from "./components/login";
import registry from "./components/registry";
import forgetPassword from "./components/forgetPassword";

export default {
  name: "index",
  data() {
    return {
      viewDialog: -1, // 视图类型 0 登录 1 注册 2 重置密码
      roleIdentity: 1 // 角色 0 supplier 1 consumer
    };
  },
  mounted() {
    this.viewDialog = 0;
    const queryType = this.$route.query.type;
    if (queryType != undefined) {
      this.roleIdentity = parseInt(queryType);
    }
  },
  components: { login, registry, forgetPassword }
};
</script>

<style>
/** 主体样式 背景 相对布局 **/
.content {
  background: url("~@/assets/login_background.png") no-repeat;
  background-size: 100%;
  position: relative;
  width: 100%;
  height: 100vh;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-top {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.content-top > div {
  width: 49%;
}

.content-top .el-button {
  border-radius: 0px 0px 8px 8px;
  height: 30px;
  font-size: 13px;
  background: #272632;
  color: #ffffff;
  line-height: 7px;
  border: none;
  font-family: Noto Sans SC;
  width: 100%;
}

.content-top-type-focus .el-button {
  background: #00ff87;
  color: #272632;
}

.content-form .el-button {
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

.content-form .el-button.el-button--primary.is-disabled {
  background: rgba(0,255,135, 0.8);
  border-color: #00ff87;
  color: #272632;
}

.content-form .el-button--primary:focus,
.content-form .el-button--primary:hover {
  background: #00ff87;
  border-color: #00ff87;
  color: #272632;
}

img {
  width: 100%;
  height: 100%;
}

.click-title {
  color: #00ff87;
  cursor: pointer;
}

.content .show-pwd {
  position: absolute;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}

/** 基本 element-ui css 样式 **/
.content .el-form-item {
  margin-bottom: 20px;
}

.content .el-input__inner {
  border-radius: 2px;
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 12px;
  color: #ffffff;
  background: #505264;
}

/** el-checkbox 更换样式与颜色 **/
.content .el-checkbox__label {
  color: #ffffff;
  font-size: 12px;
}

.content .el-checkbox__inner {
  width: 12px;
  height: 12px;
  background: #505264;
}

.content .el-checkbox {
  color: #00ff87;
}
.content .el-checkbox__input.is-checked + .el-checkbox__label {
  color: rgba(255, 255, 255, 0.8);
}
.content .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #505264;
  border-color: #00ff87;
}
.content .unselected .el-checkbox__input .el-checkbox__inner::after {
  color: #00ff87;
}
.content .el-checkbox__input .el-checkbox__inner::after {
  color: #00ff87;
  border-color: #00ff87;
}
.content .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #00ff87;
}
</style>