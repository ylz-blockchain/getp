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
      <search-table
        :total.sync="total"
        @handleSearch="handleSearch(arguments)"
        @handleSizeChange="handleSizeChange(arguments)"
        @handleCurrentChange="handleCurrentChange(arguments)"
        :data.sync="rateRecord"
      >
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="total" label="历史收益"></el-table-column>
        <el-table-column prop="diffDays" label="运行时间">
          <template slot-scope="scope">{{ scope.row.diffDays }}天</template>
        </el-table-column>
      </search-table>
    </div>
  </el-dialog>
</template>

<script>
import { message } from "@/utils/utils";
import searchTable from "@/components/searchTable";
import { integralHistory } from "@/api/supplier/index";

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
      listQuery: {
        pageNo: 1,
        pageSize: 10
      },
      total: undefined,
      searchContent: undefined,
      rateRecord: []
    };
  },
  watch: {
    visible(newVal) {
      this.recordVisible = newVal;
    }
  },
  created() {
    this.getRecords();
  },
  methods: {
    getRecords() {
      let param = {
        name: this.searchContent,
        pageNo: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize
      };
      integralHistory(param)
        .then(res => {
          this.rateRecord = res.historyRecords;
          this.total = res.total;
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
    },
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