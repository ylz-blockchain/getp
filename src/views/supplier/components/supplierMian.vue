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
          <search-table
            :total.sync="total"
            @handleSearch="handleSearch(arguments)"
            @handleSizeChange="handleSizeChange(arguments)"
            @handleCurrentChange="handleCurrentChange(arguments)"
            :data.sync="historyTask"
          >
            <el-table-column prop="name" label="项目名称"></el-table-column>
            <el-table-column prop="total" align="center" label="产生积分">
              <template slot-scope="scope">{{ scope.row.total }}分</template>
            </el-table-column>
            <el-table-column prop="progress" align="center" label="任务状态">
              <template slot-scope="scope">
                <span v-html="filterStatus(scope.row.progress)"></span>
              </template>
            </el-table-column>
            <el-table-column prop="diffDays" align="center" label="运行时间">
              <template slot-scope="scope">{{ scope.row.diffDays }}天</template>
            </el-table-column>
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
            <span
              :style="'color:' + cpuStyle + ';'"
            >{{ deviceInfo.cpuProcess != undefined ? deviceInfo.cpuProcess + '%' : '--' }}</span>
          </div>
          <div>
            <process-charts id="cpuProcess" :processColor="cpuStyle" :data="deviceInfo.cpuProcess" />
          </div>
        </div>
        <div class="supplier-main-device-main-item">
          <div>
            <span>存储空间使用率</span>
            <span
              :style="'color:' + storeStyle + ';'"
            >{{ deviceInfo.storeProcess != undefined ? deviceInfo.storeProcess + '%' : '--' }}</span>
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
            <span
              :style="'color:' + flowStyle + ';'"
            >{{ deviceInfo.flowProcess != undefined ? deviceInfo.flowProcess + '%' : '--' }}</span>
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
import { overview, tasks, nodeDetail } from "@/api/supplier/index";

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
      this.getNodeDetail();
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
        cpuProcess: undefined,
        storeProcess: undefined,
        flowProcess: undefined,
        runData: {
          cpu: [80, 60, 40, 60, 50, 90, 40, 80, 60, 40, 60, 50, 90],
          store: [12, 32, 20, 43, 50, 34, 30, 42, 60, 40, 61, 50, 60],
          flow: [40, 60, 60, 32, 20, 61, 70, 89, 67, 74, 42, 42, 42]
        }
      },
      listQuery: {
        pageNo: 1,
        pageSize: 10
      },
      total: undefined,
      searchContent: undefined,
      cpuStyle: "#00FF87",
      storeStyle: "#6F86FF",
      flowStyle: "#00DBE8",
      resourceData: undefined,
      tests: [],
      historyTask: []
    };
  },
  created() {
    this.getOverview();
    this.getRecords();
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
    },
    filterStatus(val) {
      // 执行进度 -> 0: 待执行, 1: 执行中, 2: 已完成, 3: 已取消
      switch (val) {
        case 0:
          return "<span style='color: #FD852D'>任务挂起</span>";
        case 1:
          return "<span style='color: #00FF87'>运行中</span>";
        case 2:
          return "<span style='color: rgba(255, 255, 255, 0.8)'>已完成</span>";
        default:
          return "";
      }
    },
    filterNodeType(val) {
      switch(val) {
        case 0:
          return "iconfont iconicon_stroke_svg_pc";
        case 1:
          return "iconfont iconicon_stroke_svg_phone";
        case 2:
          return "iconfont iconicon_stroke_svg_phone";
        case 3:
          return "iconfont iconicon_stroke_svg_devide";
        default:
          return "iconfont iconicon_stroke_svg_devide";
      }
    },
    getOverview() {
      overview()
        .then(res => {
          const integrals = res.integrals;
          let x = [];
          let y = [];

          integrals.forEach(item => {
            x.push(item.createTime);
            y.push(item.total);
          });
          this.resourceData = {
            x: x,
            y: y
          };
        })
        .catch();
    },
    getRecords() {
      let param = {
        name: this.searchContent,
        pageNo: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize
      };
      tasks(param)
        .then(res => {
          this.historyTask = res.nodeOverview;
          this.total = res.total;
        })
        .catch();
    },
    getNodeDetail() {
      nodeDetail({ uniqueId: this.deviceInfo.id })
        .then(res => {
          const { name, state, cpuUsage, diskUsed, memUsed, currentIntegral, bandwidthUsed, type } = res;
          this.deviceInfo.name = name;
          this.deviceInfo.status = state;
          this.deviceInfo.score = currentIntegral;
          this.deviceInfo.cpuProcess = cpuUsage;
          this.deviceInfo.storeProcess = diskUsed;
          this.deviceInfo.flowProcess = bandwidthUsed;
          this.deviceInfo.icon = this.filterNodeType(type)
        })
        .catch();
    },
    handleSearch(param) {
      this.listQuery = param[0];
      this.searchContent = param[1];
      this.getRecords();
    },
    handleSizeChange(param) {
      this.listQuery = param[0];
      this.getRecords();
    },
    handleCurrentChange(param) {
      this.listQuery = param[0];
      this.getRecords();
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