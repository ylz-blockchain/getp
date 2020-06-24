<template>
  <div class="supplier-main">
    <!-- 概述 -->
    <div v-if="deviceInfo.id === '0'" class="supplier-main-overview">
      <div class="supplier-main-overview-today">
        <div>每日收益</div>
        <div>
          <line-charts :titleShow="true" :data="resourceData" />
        </div>
      </div>

      <div class="supplier-main-overview-history">
        <div>历史任务</div>
        <div class="supplier-main-overview-history-table">
          <search-table :data="historyTask">
            <el-table-column prop="projectName" label="项目名称"></el-table-column>
            <el-table-column prop="orderNo" label="订单号"></el-table-column>
            <el-table-column prop="consumeBalance" label="消费金额"></el-table-column>
            <el-table-column prop="buyTime" label="购买时间"></el-table-column>
          </search-table>
        </div>
      </div>
    </div>

    <!-- 设备节点 -->
    <div v-else class="supplier-main-device">
      <div class="supplier-main-device-top">
        <div class="supplier-main-device-top-title">
          <span>
            <i :class="deviceInfo.icon" />
          </span>
          <span>
            {{ deviceInfo.name }}
            <span v-html="filterTitleStyle(deviceInfo.status)"></span>
          </span>

          <template v-if="deviceInfo.status == 0">
            <span class="supplier-main-device-top-button1 pause">
              <cover-button>暂停工作</cover-button>
            </span>
          </template>

          <template v-if="deviceInfo.status == 1">
            <span class="supplier-main-device-top-button1 run">
              <cover-button>开始工作</cover-button>
            </span>
          </template>

          <span class="supplier-main-device-top-button2 delete">
            <cover-button>删除节点</cover-button>
          </span>
        </div>
        <div>积分 {{ deviceInfo.score }}</div>
      </div>
      <div class="supplier-main-device-main">
        <div class="supplier-main-device-main-item">
          <div>
            <span>CPU使用率</span>
            <span :style="'color:' + cpuStyle + ';'">{{ deviceInfo.cpuProcess != undefined ? deviceInfo.cpuProcess + '%' : '--' }}</span>
          </div>
          <div>
            <process-charts id="cpuProcess" :processColor="cpuStyle" :data="deviceInfo.cpuProcess" />
          </div>
        </div>
        <div class="supplier-main-device-main-item">
          <div>
            <span>存储空间使用率</span>
            <span :style="'color:' + storeStyle + ';'">{{ deviceInfo.storeProcess != undefined ? deviceInfo.storeProcess + '%' : '--' }}</span>
          </div>
          <div>
            <process-charts
              id="storeProcess"
              :processColor="storeStyle"
              :data="deviceInfo.storeProcess"
            />
          </div>
        </div>
        <div class="supplier-main-device-main-item">
          <div>
            <span>带宽使用率</span>
            <span :style="'color:' + flowStyle + ';'">{{ deviceInfo.flowProcess != undefined ? deviceInfo.flowProcess + '%' : '--' }}</span>
          </div>
          <div>
            <process-charts
              id="flowProcess"
              :processColor="flowStyle"
              :data="deviceInfo.flowProcess"
            />
          </div>
        </div>
      </div>
      <div class="supplier-main-device-bottom">
        <div>设备运行状态</div>
        <div>
          <device-line-charts :data="deviceInfo.runData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import processCharts from "@/components/echarts/processCharts";
import lineCharts from "@/components/echarts/lineCharts";
import deviceLineCharts from "@/components/echarts/deviceLineCharts";
import searchTable from "@/components/searchTable";
import coverButton from "@/components/button";

export default {
  name: "supplier-main",
  components: {
    processCharts,
    lineCharts,
    deviceLineCharts,
    searchTable,
    coverButton
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  watch: {
    id(newVal) {
      this.deviceInfo.id = newVal;
      this.tests.forEach(item => {
        if (this.deviceInfo.id === item.id) {
          this.deviceInfo.name = item.name;
          this.deviceInfo.icon = item.icon;
          this.deviceInfo.status = item.status;
          this.deviceInfo.score = item.score;
          this.deviceInfo.cpuProcess = item.cpuProcess;
          this.deviceInfo.storeProcess = item.storeProcess;
          this.deviceInfo.flowProcess = item.flowProcess;
        }
      });
    }
  },
  data() {
    return {
      deviceInfo: {
        id: "0",
        name: "",
        icon: "",
        status: 0,
        score: "",
        cpuProcess: 0,
        storeProcess: 0,
        flowProcess: 0,
        runData: {
          cpu: [80, 60, 40, 60, 50, 90, 40, 80, 60, 40, 60, 50, 90],
          store: [12, 32, 20, 43, 50, 34, 30, 42, 60, 40, 61, 50, 60],
          flow: [40, 60, 60, 32, 20, 61, 70, 89, 67, 74, 42, 42, 42]
        }
      },
      cpuStyle: "#00FF87",
      storeStyle: "#6F86FF",
      flowStyle: "#00DBE8",
      resourceData: {
        x: [
          "2020.05.29",
          "2020.05.30",
          "2020.05.31",
          "2020.06.01",
          "2020.06.02",
          "2020.06.03",
          "2020.06.04"
        ],
        y: [80, 60, 40, 60, 50, 90, 70]
      },
      tests: [
        {
          id: "1",
          icon: "iconfont iconicon_stroke_svg_phone",
          name: "小米8",
          status: 0,
          score: 100,
          cpuProcess: 12,
          storeProcess: 56,
          flowProcess: 68
        },
        {
          id: "2",
          icon: "iconfont iconicon_stroke_svg_phone",
          name: "苹果X",
          status: 1,
          score: 200,
          cpuProcess: undefined,
          storeProcess: undefined,
          flowProcess: undefined
        },
        {
          id: "3",
          icon: "iconfont iconicon_stroke_svg_phone",
          name: "华为mat 30",
          status: 0,
          score: 300,
          cpuProcess: 62,
          storeProcess: 50,
          flowProcess: 88
        },
        {
          id: "4",
          icon: "iconfont iconicon_stroke_svg_pc",
          name: "电脑类设备Win",
          status: 1,
          score: 400,
          cpuProcess: undefined,
          storeProcess: undefined,
          flowProcess: undefined
        },
        {
          id: "5",
          icon: "iconfont iconicon_stroke_svg_devide",
          name: "其他类设备矿机",
          status: 2,
          score: 500,
          cpuProcess: undefined,
          storeProcess: undefined,
          flowProcess: undefined
        }
      ],
      historyTask: [
        {
          projectName: "土地利用分析",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥128",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "土地利用分析",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥76",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "深圳南山区车流量统计与分析",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥76",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "湖南省辣椒消耗量评估",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥245",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "湖南省辣椒消耗量评估",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥245",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "湖南省辣椒消耗量评估",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥245",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "湖南省辣椒消耗量评估",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥245",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "湖南省辣椒消耗量评估",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥245",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "湖南省辣椒消耗量评估",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥245",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "全球海平面近十年变化分析",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥542",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "北京市风沙治理近二十年效果分析与检测",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥327",
          buyTime: "2020.06.01.18:32"
        }
      ]
    };
  },
  methods: {
    filterTitleStyle(status) {
      switch (status) {
        case 0:
          return "<span class='run'>（运行中）</span>";
        case 1:
          return "<span class='pause'>（空闲）</span>";
        case 2:
          return "<span class='delete'>（错误，请检查设备！）</span>";
        default:
          return "";
      }
    }
  }
};
</script>

<style>
.supplier-main {
  height: 100%;
}

/** 概述 **/
.supplier-main-overview {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-content: space-between;
}

.supplier-main-overview > div {
  background: #3f4050;
  width: 100%;
}

.supplier-main-overview-today {
  height: 40%;
  display: flex;
  flex-direction: column;
}

.supplier-main-overview-today > div:first-child {
  height: 13%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  font-size: 1.7vh;
  align-items: center;
  color: #ffffff;
  padding-left: 1%;
}

.supplier-main-overview-today > div:last-child {
  height: 87%;
}

.supplier-main-overview-history {
  height: 57%;
}

.supplier-main-overview-history > div:first-child {
  height: 10%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  font-size: 1.7vh;
  color: #ffffff;
  padding-left: 1%;
}

.supplier-main-overview-history-table {
  background: #2a2a36;
  height: 80%;
  margin: 1% 1% 1% 1%;
  padding: 2px 2px 2px 2px;
}

/** 设备模块 **/
.supplier-main-device {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-content: space-between;
}

.supplier-main-device > div {
  width: 100%;
}

.supplier-main-device-top {
  background: #3f4050;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2%;
  padding-right: 2%;
}

.supplier-main-device-top .iconfont {
  font-size: 3vh;
}

.supplier-main-device-top > div:last-child {
  color: #ffffff;
  font-size: 2.5vh;
}

.supplier-main-device-top .el-button {
  width: 100%;
  height: 35px;
  line-height: 7px;
  background: none;
}

.supplier-main-device-top-button1,
.supplier-main-device-top-button2 {
  position: relative;
}

.supplier-main-device-top .pause .el-button {
  border-color: #ffffff;
  color: #ffffff;
}

.supplier-main-device-top .delete .el-button {
  border-color: #ff4d35;
  color: #ff4d35;
}

.supplier-main-device-top .run .el-button {
  border-color: #00ff87;
  color: #000000;
  background: #00ff87;
}

.supplier-main-device-top .pause {
  color: #ffffff;
}

.supplier-main-device-top .delete {
  color: #f4812f;
}

.supplier-main-device-top .run {
  color: #00ff87;
}

.supplier-main-device-top-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2.5vh;
  color: #ffffff;
  width: 50%;
}

.supplier-main-device-top-title > span {
  margin-right: 2%;
}

.supplier-main-device-main {
  height: 40%;
  display: flex;
  justify-content: space-between;
}

.supplier-main-device-main-item {
  width: 32.5%;
  background: #3f4050;
  display: flex;
  flex-direction: column;
}

.supplier-main-device-main-item > div:first-child {
  font-size: 1.7vh;
  color: #ffffff;
  height: 15%;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.supplier-main-device-main-item > div:last-child {
  height: 85%;
}

.supplier-main-device-bottom {
  background: #3f4050;
  height: 40%;
  display: flex;
  flex-direction: column;
}

.supplier-main-device-bottom > div:first-child {
  font-size: 1.7vh;
  color: #ffffff;
  height: 15%;
  padding-left: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.supplier-main-device-bottom > div:last-child {
  height: 85%;
}
</style>