<template>
  <div class="consumer">
    <!-- 主页头部 -->
    <div class="consumer-top">
      <el-row class="consumer-top-title">
        <el-col :span="4">
          <img src="@/assets/consumer_top_1.png" />
        </el-col>
        <el-col class="consumer-top-title-number" :span="16" :offset="2">
          <div class="consumer-title">6</div>
          <div class="second-title">正在运行的项目</div>
        </el-col>
      </el-row>
      <el-row class="consumer-top-title">
        <el-col :span="4">
          <img src="@/assets/consumer_top_2.png" />
        </el-col>
        <el-col class="consumer-top-title-number" :span="16" :offset="2">
          <div class="consumer-title" style="color: #FFFFFF">17</div>
          <div class="second-title">已经完成的项目</div>
        </el-col>
      </el-row>
      <el-row class="consumer-top-title">
        <el-col :span="4">
          <img src="@/assets/consumer_top_3.png" />
        </el-col>
        <el-col class="consumer-top-title-number" :span="16" :offset="2">
          <div class="consumer-title" style="color: #FFFFFF">2</div>
          <div class="second-title">已经停止的项目</div>
        </el-col>
      </el-row>
    </div>

    <!-- 主页主体 -->
    <div class="consumer-main">
      <div class="consumer-main-balance">
        <div class="consumer-main-title">
          <div>账户余额</div>
          <div></div>
        </div>
        <div class="consumer-main-balance-up">
          <div>账户余额：¥10000元</div>
          <div>
            <el-button @click="handlePay">立即充值</el-button>
          </div>
        </div>
        <pay :visible.sync="payVisible" />
      </div>

      <div class="consumer-main-process">
        <div class="consumer-main-title">
          <div>总进度</div>
          <div style="color: #00FF87">68%</div>
        </div>
        <div>
          <consumer-process :data="processData" />
        </div>
      </div>
    </div>

    <!-- 主页底部 -->
    <div class="consumer-buttom">
      <div class="consumer-buttom-title">计算资源占用</div>
      <div class="consumer-buttom-resource">
        <consumer-resource :data="resourceData" />
      </div>
    </div>
  </div>
</template>

<script>
import consumerProcess from "@/components/echarts/consumerProcess";
import consumerResource from "@/components/echarts/consumerResource";
import pay from "@/views/pay";

export default {
  name: "consumer",
  data() {
    return {
      processData: 68,
      resourceData: {
        x: ["2020.05.29", "2020.05.30", "2020.05.31", "2020.06.01", "2020.06.02", "2020.06.03", "2020.06.04"],
        y: [80, 60, 40, 60, 50, 90, 70]
      },
      payVisible: false
    };
  },
  components: { consumerProcess, consumerResource, pay },
  methods: {
    handlePay() {
      this.payVisible = true;
    }
  }
};
</script>

<style>
.consumer {
  background: #272632;
  position: relative;
  height: 100%;
  padding: 1% 1% 1% 1%;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-align-content: center;
  align-content: space-between;
}

.consumer > div {
  width: 100%;
  background: #3f4050;
}

.consumer-title {
  color: #00ff87;
  font-family: Noto Sans SC;
  font-weight: bold;
  font-size: 4vh;
  line-height: 4vh;
  letter-spacing: 0px;
  text-align: left;
}

.second-title {
  color: rgba(255, 255, 255, 0.8);
  font-family: Noto Sans SC;
  font-weight: bold;
  font-size: 2vh;
  line-height: 2vh;
  letter-spacing: 0px;
  text-align: left;
}

.consumer-top {
  height: 15%;
  display: flex;
  align-items: center;
}

.consumer-top > div {
  width: 100%;
  height: 60%;
  margin-left: 3%;
}

.consumer-top > div:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.consumer-buttom {
  height: 40%;
}

.consumer-top-title > div:first-child {
  height: 100%;
}

.consumer-top img {
  width: auto;
  height: 100%;
}

.consumer-top-title-number {
  display: flex;
  height: 100%;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}

.consumer-top-title-number div {
  height: 50%;
  width: 100%;
  display: flex;
  align-items: flex-end;
}

.consumer-top-title-number div:first-child {
  align-items: flex-start;
}
.consumer-top-title-number div:last-child {
  align-items: flex-end;
}

.consumer-main {
  height: 40%;
  background: none !important;
  display: flex;
  justify-content: space-between;
}

.consumer-main > div {
  height: 100%;
  background: #3f4050;
}

.consumer-main .el-dialog__header,
.consumer-main .el-dialog__footer,
.consumer-main .el-dialog__body {
  background: #505264;
}

.consumer-main .el-dialog__header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.consumer-main .el-dialog__title {
  font-size: 13px;
  color: #ffffff;
}

.consumer-main .el-dialog__body {
  padding: 30px 50px;
}

.consumer-main .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}

.consumer-main-balance {
  width: 70%;
}

.consumer-main-title {
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 13px;
  padding-left: 12px;
  padding-right: 12px;
  line-height: 1vh;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.consumer-main-balance-up {
  height: 85%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  font-family: Noto Sans SC;
  font-weight: bold;
}

.consumer-main-balance-up > div:first-child {
  font-size: 4vh;
  line-height: 4vh;
}

.consumer-main-balance-up > div:last-child {
  width: 15%;
  position: relative;
}

.consumer-main-balance-up .el-button {
  border-radius: 2px;
  width: 100%;
  background: #00ff87;
  color: #272632;
  border: none;
  height: 40px;
  font-family: Noto Sans SC;
  font-size: 13px;
  font-weight: 400;
}

.consumer-main-process {
  width: 29%;
}

.consumer-main-process > div:last-child {
  width: 100%;
  height: 85%;
}

.consumer-buttom-title {
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 13px;
  padding-left: 12px;
  padding-right: 12px;
  line-height: 1vh;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.consumer-buttom-resource {
  height: 85%;
}
</style>