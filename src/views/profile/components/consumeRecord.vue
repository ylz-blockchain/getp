<template>
  <el-dialog
    title="消费记录"
    :visible="recordVisible"
    :before-close="handleClose"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    :icon="false"
    width="60%"
  >
    <div class="consume-record">
      <search-table :data="consumeRecord">
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="consumeBalance" label="消费金额"></el-table-column>
        <el-table-column prop="buyTime" label="购买时间"></el-table-column>
      </search-table>
    </div>
  </el-dialog>
</template>

<script>
import { message } from "@/utils/utils";
import searchTable from "@/components/searchTable";

export default {
  name: "consumer-record",
  components: { searchTable },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchContent: undefined,
      recordVisible: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        sortProp: undefined,
        sortType: undefined
      },
      total: 50,
      consumeRecord: [
        {
          projectName: "土地利用分析",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥128",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "湖南省辣椒消耗量评估",
          orderNo: "34535296791023120201223",
          consumeBalance: "¥213",
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
          projectName: "鼠标悬浮时改变填充色",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥327",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "全球海平面近十年变化分析",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥345",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "湖南省辣椒消耗量评估",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥764",
          buyTime: "2020.06.01.18:32"
        },
        {
          projectName: "深圳南山区车流量统计与分析",
          orderNo: "34535296791023120235234",
          consumeBalance: "¥243",
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
.consume-record {
  background: #3d3d4d;
  height: 400px;
}
</style>