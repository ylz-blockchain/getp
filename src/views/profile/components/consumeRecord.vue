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
    <div class="record">
      <div class="record-search">
        <div>
          <el-input v-model="searchContent" placeholder="请输入搜索内容"></el-input>
          <span class="show-search" @click="handleSearch">
            <i class="iconfont iconicon_stroke_svg_search"></i>
          </span>
        </div>
      </div>

      <div class="record-table">
        <el-table :data="consumeRecord" style="width: 100%">
          <el-table-column prop="projectName" label="项目名称"></el-table-column>
          <el-table-column prop="orderNo" label="订单号"></el-table-column>
          <el-table-column prop="consumeBalance" label="消费金额"></el-table-column>
          <el-table-column prop="buyTime" label="购买时间"></el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="listQuery.pageNo"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="listQuery.pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { message } from "@/utils/utils";

export default {
  name: "consumer-record",
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
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleSearch() {}
  }
};
</script>

<style>
.record {
  display: flex;
  flex-direction: column;
  background: #3d3d4d;
}

.record-search {
  background: #3f4050;
  margin-bottom: 5px;
  padding-left: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 5px;
}

.record-search > div {
  position: relative;
  width: 320px;
}

.record-search .show-search {
  position: absolute;
  right: 10px;
  font-size: 16px;
  top: 5px;
  cursor: pointer;
  user-select: none;
}

.record-search .iconicon_stroke_svg_search {
  color: rgba(255, 255, 255, 0.8);
}

.record-search .el-input__inner {
  color: rgba(255, 255, 255, 0.4) !important;
  border: 1px solid #585866 !important;
  height: 30px !important;
}

/** 表格样式 **/
.record-table .el-table::before {
  height: 0px;
}

.record-table .el-table__header-wrapper {
  box-shadow: 0px 0px 4px 0 #000817;
}

.record-table .el-table th {
  background: #3f4050;
  color: #ffffff;
}

.record-table .el-table tr {
  background: #393a48;
  color: #b0b1b6;
  font-size: 12px;
}

.record-table .el-table td {
  padding: 0px;
  height: 35px;
  line-height: 35px;
}

.record-table .el-table td {
  border-bottom: 1px solid #4c4d59;
}

.record-table .el-table th.is-leaf {
  border-bottom: none;
}

.record-table .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #3f4050 !important;
}

.record-table .el-pagination button, .el-pagination span:not([class*=suffix]) {
  color: #FFFFFF;
}

.record-table .pagination-container {
  height: 40px;
  display: flex;
  align-items: center;
}

.record-table .el-pagination .el-input__suffix {
  top: 0px;
}

.record-table .el-pagination button {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.record-table .el-pagination button:disabled {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.record-table .el-pager li.active {
  color: #00ff87;
  border: 1px solid #00ff87;
}

.record-table .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #3f4050;
  color: #00ff87;
  border: 1px solid #00ff87;
}

.record-table .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
  color: #00ff87 !important;
}

.record-table .el-pagination.is-background .el-pager li {
  background: #3f4050;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.record-table .el-pagination.is-background .el-pager li:hover {
  color: #FFFFFF !important;
}

.record-table .el-pagination.is-background .btn-prev {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #FFFFFF;
}

.record-table .el-pagination.is-background .btn-next {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #FFFFFF;
}

.record-table .el-pagination__editor.el-input .el-input__inner:focus {
  border: 1px solid #FFFFFF !important;
}
</style>