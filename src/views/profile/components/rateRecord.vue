<template>
  <el-dialog
    title="收益详情"
    :visible="recordVisible"
    :before-close="handleClose"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    :icon="false"
    width="60%"
  >
    <div class="rate-record">
      <search-table :data="rateRecord">
        <el-table-column prop="deviceName" label="设备名称"></el-table-column>
        <el-table-column prop="historyRate" label="历史收益"></el-table-column>
        <el-table-column prop="runTime" label="运行时间"></el-table-column>
      </search-table>
    </div>
  </el-dialog>
</template>

<script>
import { message } from "@/utils/utils";
import searchTable from "@/components/searchTable";

export default {
  name: "rate-record",
  components: { searchTable },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recordVisible: false,
      rateRecord: [
        {
          deviceName: "手机类设备小米8",
          historyRate: "3000积分",
          runTime: "23天"
        },
        {
          deviceName: "苹果X",
          historyRate: "8000积分",
          runTime: "43天"
        },
        {
          deviceName: "华为mat 30",
          historyRate: "2000积分",
          runTime: "12天"
        },
        {
          deviceName: "华为mat 30",
          historyRate: "2000积分",
          runTime: "12天"
        },
        {
          deviceName: "华为mat 30",
          historyRate: "2000积分",
          runTime: "12天"
        },
        {
          deviceName: "Windo2",
          historyRate: "23000积分",
          runTime: "43天"
        }
      ]
    };
  },
  watch: {
    visible(newVal) {
      this.recordVisible = newVal;
    }
  },
  methods: {
    handleClose() {
      this.recordVisible = false;
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style>
.rate-record {
  background: #3d3d4d;
  height: 400px;
}
</style>