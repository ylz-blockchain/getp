<template>
  <el-dialog
    title="充值"
    :visible="payVisible"
    :before-close="handleClose"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :icon="false"
    width="60%"
  >
    <div class="pay">
      <!-- step 步骤 -->
      <div>
        <el-steps :active="active" simple finish-status="success">
          <el-step title="选择充值金额"></el-step>
          <el-step title="支付"></el-step>
          <el-step title="完成充值"></el-step>
        </el-steps>
      </div>

      <div v-if="active == 0" class="pay-balance">
        <!-- 默认金额 -->
        <div class="pay-balance-default">
          <ul>
            <li
              v-for="(item) in defulatBalance"
              :class="item.isCheck ? 'pay-balance-default-item is-check' : 'pay-balance-default-item'"
              @click="handlePriceClick(item.index)"
              :key="item.index"
            >
              <div>￥{{ item.balance }}</div>
              <div>CNY</div>
            </li>
          </ul>
        </div>

        <!-- 自定义金额 -->
        <div class="pay-balance-custom">
          <div>其他金额</div>
          <div>
            <el-form :rules="payRules" ref="payForm" :show-message="false" :model="pay">
              <el-form-item prop="payBalance">
                <el-input
                  type="number"
                  v-model.number="pay.payBalance"
                  placeholder="请输入1-5000之间的数额 (最终将以输入为准)"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

      <div v-if="active == 1" class="pay-code">
        <div>
          <img src="@/assets/pay_code.png" />
        </div>
      </div>

      <div v-if="active == 2" class="pay-finish">
        <div>充值成功</div>
      </div>

      <div class="pay-submit">
        <div v-if="active == 0" class="pay-submit-type">
          <div>选择充值方式</div>
          <div>
            <el-radio v-model="pay.payType" :label="0">支付宝</el-radio>
            <el-radio v-model="pay.payType" :label="1">微信支付</el-radio>
          </div>
        </div>
        <div v-if="active == 1">订单号：18896791023120201223</div>
        <div v-if="active == 2">当前余额：¥2050</div>

        <div :class="active == 1 ? 'pay-submit-button pre' : 'pay-submit-button next'">
          <cover-button @click.native="clickStep(active)">{{active | filterTitle}}</cover-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import coverButton from "@/components/button";
import { message } from "@/utils/utils";

export default {
  name: "pay",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: { coverButton },
  data() {
    return {
      payVisible: false,
      active: 0,
      pay: {
        payBalance: undefined,
        payType: 0 // 支付方式
      },
      payRules: {
        payBalance: [
          {
            pattern: /^\+?([1-9]|[1-4]\d{1,3}|[5-9]\d{1,2}|5000)(\.\d*)?$/,
            message: "请输入1-5000之间的数额",
            trigger: "blur"
          }
        ]
      },
      defulatBalance: [
        {
          index: 0,
          balance: 50,
          isCheck: true
        },
        {
          index: 1,
          balance: 100,
          isCheck: false
        },
        {
          index: 2,
          balance: 400,
          isCheck: false
        },
        {
          index: 3,
          balance: 800,
          isCheck: false
        }
      ]
    };
  },
  watch: {
    visible(newVal) {
      this.payVisible = newVal;
      this.pay.payBalance = undefined;
      this.pay.payType = 0;
    }
  },
  filters: {
    filterTitle(val) {
      switch (val) {
        case 0:
          return "创建订单";
        case 1:
          return "返回上一步";
        case 2:
          return "确定";
        default:
          return "";
      }
    }
  },
  methods: {
    handleClose() {
      this.payVisible = false;
      this.$emit("update:visible", false);
    },
    handlePriceClick(index) {
      this.defulatBalance.forEach(item => {
        if (item.index === index) {
          item.isCheck = true;
        } else {
          item.isCheck = false;
        }
      });
    },
    clickStep() {
      if (this.active == 0) {
        if (this.pay.payBalance === undefined || this.pay.payBalance === "") {
          this.defulatBalance.forEach(item => {
            if (item.isCheck) {
              this.pay.payBalance = item.balance;
            }
          });
        } else {
          let flag = false;
          this.$refs.payForm.validate((valid, field) => {
            if (!valid) {
              let errorMessage = "";
              for (let item in field) {
                errorMessage = field[item][0].message;
                break;
              }
              message(errorMessage, "error");

              flag = true;
              return false;
            }
          });

          if (flag) {
            return;
          }
        }

        this.active = 1;
      } else if (this.active == 1) {
        this.pay.payBalance = undefined;
        this.active = 0;
      } else {
        this.handleClose();
      }
    }
  }
};
</script>

<style>
.pay {
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.8);
}

.pay > div:first-child {
  margin-bottom: 20px;
}

.pay .el-steps--simple {
  border-radius: 50px !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

.pay .el-step.is-simple .el-step__icon {
  display: none;
}

.pay .el-step__title.is-wait {
  color: #ffffff;
  font-size: 14px !important;
}

.pay .el-step__title.is-process {
  color: #00ff87;
  font-size: 14px !important;
}

.pay .el-step__title.is-success {
  color: #00ff87;
  font-size: 14px !important;
}

.pay .el-step.is-simple .el-step__arrow::after {
  transform: rotate(45deg) translateY(3px);
}

.pay .el-step.is-simple .el-step__arrow::before {
  transform: rotate(-45deg) translateY(-3px);
}

.pay .el-step.is-simple .el-step__arrow::after,
.el-step.is-simple .el-step__arrow::before {
  height: 10px !important;
}

.pay-balance {
  display: flex;
  flex-direction: column;
  height: 220px;
  margin-top: 5%;
  margin-bottom: 5%;
}

.pay-balance-default {
  padding-left: 2%;
  padding-right: 2%;
}

.pay-balance-default > ul {
  display: flex;
  justify-content: space-between;
  padding: 0px;
}

.pay-balance-default > ul > li {
  list-style-type: none;
}

.pay-balance-default-item {
  height: 80px;
  width: 150px;
  padding-top: 10px;
  color: #ffffff;
  font-size: 4vh;
  border-radius: 2px;
  border: 1px solid #ffffff;
  cursor: pointer;
  position: relative;
}

.is-check {
  border: 1px solid #00ff87;
  color: #00ff87;
}

.is-check > div:last-child {
  background: #00ff87 !important;
}

.pay-balance-default-item > div {
  text-align: center;
}

.pay-balance-default-item > div:last-child {
  position: absolute;
  font-size: 2vh;
  width: 120px;
  height: 20px;
  line-height: 20px;
  right: 0px;
  bottom: 5px;
  color: #000000;
  background: #ffffff;
}

.pay-balance-custom {
  display: flex;
  height: 35px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2%;
  padding-right: 2%;
  margin-top: 5%;
  margin-bottom: 5%;
  color: rgba(255, 255, 255, 0.8);
}

.pay-balance-custom .el-form-item {
  margin-bottom: 0px;
}

.pay-balance-custom > div:first-child {
  width: 10%;
  text-align: left;
}

.pay-balance-custom > div:last-child {
  width: 90%;
}

.pay-balance-custom .el-input__inner {
  width: 100%;
  background: rgba(39, 38, 50, 0.1);
  height: 35px;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #ffffff;
  border-radius: 2px;
}

.pay-submit {
  display: flex;
  align-items: center;
  padding-left: 2%;
  padding-right: 2%;
  justify-content: space-between;
}

.pay-submit-type {
  width: 50%;
  display: flex;
}

.pay-submit-type > div {
  margin-right: 10%;
}

.pay-submit-type .el-radio {
  color: rgba(255, 255, 255, 0.8);
}

.pay-submit-type .el-radio__inner {
  background: none;
}

.pay-submit-type .el-radio__input.is-checked .el-radio__inner {
  border-color: #00ff87;
  background: none;
}

.pay-submit-type .el-radio__input.is-checked + .el-radio__label {
  color: rgba(255, 255, 255, 0.8);
}

.pay-submit-type .el-radio__inner::after {
  background-color: #00ff87;
}

.pay-submit-button {
  width: 50%;
  display: flex;
  justify-content: flex-end;
}

.pay-submit-button > div {
  position: relative;
  width: 50%;
}

.pay-submit-button .el-button {
  width: 100%;
  height: 35px;
  border-radius: 2px;
  border: none;
  font-family: Noto Sans SC;
  font-size: 13px;
  font-weight: 400;
}

.pay-submit-button .el-button--primary:focus,
.pay-submit-button .el-button--primary:hover {
  background: #00ff87;
  border-color: #00ff87;
  color: #272632;
}

.next .el-button {
  background: #00ff87;
  color: #272632;
}

.pre .el-button {
  background: none !important;
  color: rgba(255, 255, 255, 0.8) !important;
  border: 1px solid #ffffff !important;
}

.pay-code {
  margin-top: 5%;
  margin-bottom: 5%;
  height: 220px;
  display: flex;
  align-items: center;
}

.pay-code > div {
  margin: 0 auto;
  border: 1px solid #00ff87;
  padding: 5px 5px 5px 5px;
}

.pay-code img {
  width: 200px;
  height: 200px;
}

.pay-finish {
  margin-top: 5%;
  margin-bottom: 5%;
  height: 220px;
  display: flex;
  align-items: center;
  font-size: 4vh;
}

.pay-finish > div {
  margin: 0 auto;
  color: #00ff87;
}

.pay input::-webkit-outer-spin-button,
.pay input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.pay input[type="number"] {
  -moz-appearance: textfield;
}
</style>