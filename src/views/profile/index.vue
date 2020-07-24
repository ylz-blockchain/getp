<template>
  <el-drawer
    title="个人中心"
    :modal="false"
    :visible="drawer"
    :close-on-press-escape="false"
    :direction="direction"
    :before-close="handleClose"
  >
    <div class="profile">
      <!-- 基础信息 -->
      <div class="profile-basic">
        <div>基础信息</div>
        <div class="profile-basic-name">
          <div class="profile-content">
            <div class="profile-content-title">
              <div>昵称</div>
              <div class="profile-value">
                <label v-if="!isEdit">{{ userInfo.username }}</label>
                <div v-if="isEdit" class="profile-value-name">
                  <el-input v-model="userInfo.username" ref="username" />
                  <span class="clear-name" @click="clearName">
                    <i class="iconfont iconicon_fill_svg_clear"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="profile-content-click">
              <div v-if="!isEdit">
                <span @click="handleClick">修改</span>
              </div>
              <div v-else>
                <span @click="handleClear" style="color: #FFFFFF;margin-right: 10%">取消</span>
                <span @click="handleSave">保存</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 钱包 -->
      <div v-if="userInfo.roleType === 'consumer'" class="profile-wallet">
        <div>钱包</div>
        <div class="profile-wallet-balance">
          <div class="profile-content">
            <div class="profile-content-title">
              <div>余额</div>
              <div class="profile-value">¥{{ userInfo.balance }}</div>
            </div>
            <div class="profile-content-click">
              <span @click="handlePay">充值</span>
            </div>

            <pay :visible.sync="payVisible" />
          </div>
        </div>

        <div class="profile-wallet-balance">
          <div class="profile-content">
            <div>消费记录</div>
            <div class="profile-wallet-balance-record">
              <div v-for="(item, index) in userInfo.balanceRecords" :key="index" class="profile-wallet-balance-record-item">
                <div>{{ item.amount }}</div>
                <div>{{ item.buyDate }}</div>
                <div class="profile-content-click">
                  <span v-if="index === userInfo.balanceRecords.length - 1" @click="handleConsumeRecord">查看详情</span>
                </div>
              </div>

              <consume-record :visible.sync="consumeRecordVisible" />
            </div>
          </div>
        </div>
      </div>

      <!-- 钱包 -->
      <div v-if="userInfo.roleType === 'supplier'" class="profile-wallet">
        <div>钱包</div>
        <div class="profile-wallet-rate-item">
          <div>总收益</div>
          <div>{{ userInfo.total }}积分</div>
          <div>剩余{{ userInfo.current }}积分</div>
          <div class="profile-content-click">
            <span>提现</span>
          </div>
        </div>
        <div class="profile-wallet-rate-item">
          <div>收益详情</div>
          <div>设备名称</div>
          <div>运行时间</div>
          <div>历史收益</div>
        </div>
        <div
          v-for="( item, index ) in userInfo.rateRecords"
          :key="index"
          class="profile-wallet-rate-item"
        >
          <div></div>
          <div>{{ item.name }}</div>
          <div>{{ item.diffDays }}天</div>
          <div>{{ item.total }}积分</div>
        </div>
        <div class="profile-wallet-rate-item">
          <div></div>
          <div></div>
          <div></div>
          <div class="profile-content-click">
            <span @click="handleRateRecord">查看更多</span>
          </div>
        </div>

        <div class="profile-wallet-rate-record">
          <rate-record :visible.sync="rateRecordVisible" />
        </div>
      </div>

      <!-- 安全 -->
      <div class="profile-security">
        <div>安全</div>
        <div class="profile-security-name">
          <div class="profile-content">
            <div class="profile-content-title">
              <div>手机号</div>
              <div class="profile-value">{{ userInfo.phone }}</div>
            </div>
            <div class="profile-content-click">
              <span @click="handleChangePassword">修改密码</span>
            </div>
          </div>

          <change-password :phone="userInfo.phone" :visible.sync="changePasswordVisible" />
        </div>
      </div>

      <!-- 退出登录 -->
      <div class="profile-out">
        <cover-button @click.native="loginOut">退出登录</cover-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import coverButton from "@/components/button";
import pay from "@/views/pay";
import consumeRecord from "./components/consumeRecord";
import rateRecord from "./components/rateRecord";
import changePassword from "./components/changePassword";
import { message } from "@/utils/utils";
import { mapGetters } from "vuex";
import { changeUserInfo } from "@/api/admin/user";
import { center } from "@/api/index/index";

export default {
  name: "profile",
  components: { coverButton, pay, consumeRecord, rateRecord, changePassword },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["user", "role"])
  },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      isEdit: false,
      userInfo: {
        username: "乌班鱼",
        total: 0,
        current: 0,
        balance: 0,
        roleType: "consumer",
        phone: "",
        balanceRecords: [],
        rateRecords: []
      },
      payVisible: false,
      consumeRecordVisible: false,
      rateRecordVisible: false,
      changePasswordVisible: false
    };
  },
  created() {
    this.userInfo.roleType = this.role;
    this.userInfo.username = this.user;
    this.getCenter();
  },
  watch: {
    visible(newVal) {
      this.drawer = newVal;
    }
  },
  methods: {
    getCenter() {
      center()
        .then(res => {
          const { phone, total, current } = res;
          this.userInfo.total = total;
          this.userInfo.phone = phone;
          this.userInfo.current = current;
          if (this.userInfo.roleType == "consumer") {
            const { balance, accountRecords } = res;
            this.userInfo.balance = balance;
            this.userInfo.balanceRecords = accountRecords;
          } else {
            const { historyRecords } = res;
            this.userInfo.rateRecords = historyRecords;
          }
        })
        .catch();
    },
    handleClose() {
      this.drawer = false;
      this.$emit("update:visible", false);
    },
    loginOut() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    handleClick() {
      this.isEdit = true;
    },
    clearName() {
      this.userInfo.username = "";
    },
    handleSave() {
      let param = {
        realname: this.userInfo.username
      };
      changeUserInfo(param)
        .then(res => {
          message("修改用户名成功", "success");
          this.isEdit = false;
        })
        .catch();
    },
    handleClear() {
      this.isEdit = false;
    },
    handlePay() {
      this.payVisible = true;
    },
    handleConsumeRecord() {
      this.consumeRecordVisible = true;
    },
    handleRateRecord() {
      this.rateRecordVisible = true;
    },
    handleChangePassword() {
      this.changePasswordVisible = true;
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
  overflow: auto;
}

.profile {
  height: 800px;
}

.profile > div {
  margin-bottom: 5%;
}

.profile .el-dialog__header,
.profile .el-dialog__footer,
.profile .el-dialog__body {
  background: #505264;
}

.profile .el-dialog__header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.profile .el-dialog__title {
  font-size: 13px;
  color: #ffffff;
}

.profile .el-dialog__body {
  padding: 30px 50px;
}

.profile-wallet-balance-record .el-dialog__body {
  padding: 0px !important;
}

.profile .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}

.profile-security-name .el-dialog__header {
  display: none;
}

.profile-security-name .el-dialog__body {
  padding: 30px 50px 0px 50px !important;
  border: 1px solid #00ff87;
}

.profile .el-input__inner {
  height: 25px;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(39, 38, 50, 0.1);
  font-size: 12px;
  width: 100%;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.iconicon_fill_svg_clear {
  font-size: 8px !important;
  color: #ffffff;
}

.clear-name {
  position: absolute;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}

.profile .el-input__suffix {
  position: absolute;
  top: -8px;
}

.profile-basic {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 12px;
}

.profile-basic-name {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
}

.profile-content {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: rgba(255, 255, 255, 0.8);
}

.profile-content-title {
  display: flex;
  width: 80%;
  height: 30px;
  align-items: center;
}

.profile-content-title > div {
  width: 50px;
  margin-right: 10%;
}

.profile-value {
  width: 60% !important;
}

.profile-value-name {
  position: relative;
}

.profile-content-click {
  color: #00ff87;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.profile-content-click span {
  cursor: pointer;
}

.profile-content-click > div {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.profile-wallet {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/** consumer 部分 **/
.profile-wallet-balance {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.profile-wallet-balance-record {
  width: 80% !important;
}

.profile-wallet-balance-record-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.profile-wallet-balance-record-item > div:nth-child(2) {
  flex: 1;
}

.profile-wallet-balance-record-item > div:not(:nth-child(2)) {
  flex: 0.5;
}

.profile-wallet-balance-record-item > div {
  margin-bottom: 20px;
}

/** supplier 部分 **/
.profile-wallet-rate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-top: 10px;
  height: 30px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
}

.profile-wallet-rate-item > div:first-child,
.profile-wallet-rate-item > div:nth-child(2) {
  text-align: left;
}

.profile-wallet-rate-item > div:first-child,
.profile-wallet-rate-item > div:last-child {
  width: 20%;
}

.profile-wallet-rate-item > div:last-child,
.profile-wallet-rate-item > div:nth-child(3) {
  text-align: right;
}

.profile-wallet-rate-item > div:nth-child(2),
.profile-wallet-rate-item > div:nth-child(3) {
  width: 30%;
}

.profile-wallet-rate-record .el-dialog__body {
  padding: 0px !important;
}

.profile-security {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 12px;
}

.profile-security-name {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
}

.profile-out {
  width: 100%;
  position: relative;
}

.profile-out .el-button {
  width: 100%;
  border: 1px solid #00ff87;
  background: none;
  color: #00ff87;
}

.profile-out .el-button.el-button--primary.is-disabled {
  background: none;
  border-color: #00ff87;
  color: #00ff87;
}

.profile-out .el-button--primary:focus,
.profile-out .el-button--primary:hover {
  background: none;
  border-color: #00ff87;
  color: #00ff87;
}
</style>