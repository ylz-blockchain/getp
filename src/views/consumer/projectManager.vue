<template>
  <div class="project">
    <!-- 头部 -->
    <div class="project-header">
      <!-- 添加项目与搜索 -->
      <div>
        <div class="project-header-add">
          <cover-button @click.native="handleAddProject">新增项目</cover-button>

          <add-project :visible.sync="addProjectVisible" />
        </div>
        <div class="project-header-search">
          <el-input v-model="searchContent" placeholder="请输入搜索内容"></el-input>
          <span class="show-search" @click="handleSearch">
            <i class="iconfont iconicon_stroke_svg_search"></i>
          </span>
        </div>
      </div>

      <!-- 筛选选择 -->
      <div>
        <div class="project-header-filter">
          <el-checkbox-group @change="handleFilterChange" v-model="listQuery.filterCheck">
            <el-checkbox-button :label="0">
              <i class="iconfont iconicon_stroke_svg_run"></i> 运行中
            </el-checkbox-button>
            <el-checkbox-button :label="1">
              <i class="iconfont iconicon_stroke_svg_unwork"></i>已停止
            </el-checkbox-button>
            <el-checkbox-button :label="2">
              <i class="iconfont iconicon_stroke_svg_finished"></i>已完成
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
    </div>

    <hr style="height: 3px; background-color: #3b3c4b; border: none; margin: 0px" />

    <!-- 表格 -->
    <div class="project-table">
      <el-table :max-height="maxHeight" :data="projectRecord" style="width: 100%;">
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="startTime" align="center" label="订单号"></el-table-column>
        <el-table-column prop="taskProcess" align="center" label="任务进度">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.taskProcess" status="success"></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="taskStatus" align="center" label="任务状态">
          <template slot-scope="scope">
            <span v-html="filterStatus(scope.row.taskStatus)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="time" align="center" label="耗时"></el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              :class="filterButtonClass(scope.row)"
              v-html="filterOperation(scope.row)"
              @click="handleOperation(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
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
</template>

<script>
import coverButton from "@/components/button";
import { message } from "@/utils/utils";
import addProject from "./components/addProject"

export default {
  name: "project-manager",
  components: { coverButton, addProject },
  data() {
    return {
      searchContent: undefined,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        sortProp: undefined,
        sortType: undefined,
        filterCheck: [0, 1, 2]
      },
      addProjectVisible: false,
      maxHeight: 1080, // 表格高度
      total: 50,
      projectRecord: [
        {
          projectName: "土地利用分析",
          startTime: "2020.03.22",
          taskProcess: 100,
          taskStatus: 0, // 0 停止 1 运行中 2 已完成
          time: "43天"
        },
        {
          projectName: "湖南省辣椒消耗量评估",
          startTime: "2020.03.22",
          taskProcess: 20,
          taskStatus: 1, // 0 停止 1 运行中 2 已完成
          time: "43天"
        },
        {
          projectName: "全球海平面近十年变化分析",
          startTime: "2020.03.22",
          taskProcess: 80,
          taskStatus: 1, // 0 停止 1 运行中 2 已完成
          time: "43天"
        },
        {
          projectName: "北京市风沙治理近二十年效果分析与检测",
          startTime: "2020.03.22",
          taskProcess: 60,
          taskStatus: 2, // 0 停止 1 运行中 2 已完成
          time: "43天"
        }
      ]
    };
  },
  methods: {
    handleSearch() {},
    handleFilterChange() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleOperation() {},
    handleAddProject() {
      this.addProjectVisible = true;
    },
    filterStatus(val) {
      switch (val) {
        case 0:
          return "<span style='color: #FD852D'>停止</span>";
        case 1:
          return "<span style='color: rgba(255, 255, 255, 0.8)'>运行中</span>";
        case 2:
          return "<span style='color: #00FF87'>已完成</span>";
        default:
          return "";
      }
    },
    filterButtonClass(row) {
      switch (row.taskStatus) {
        case 0:
          return "success";
        case 1:
          return "warn";
        case 2:
          return "";
        default:
          return "";
      }
    },
    filterOperation(row) {
      // <el-button @click="handleOperation(scope.row)">下载结果</el-button>
      switch (row.taskStatus) {
        case 0:
          return "继续运算";
        case 1:
          return "停止运算";
        case 2:
          return "下载结果";
        default:
          return "";
      }
    }
  },
  mounted() {
    let screenHeight = document.body.clientHeight;
    this.maxHeight = screenHeight - 155;
  }
};
</script>

<style>
.project {
  background: #272632;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project .show-search {
  position: absolute;
  right: 10px;
  font-size: 16px;
  top: 5px;
  cursor: pointer;
  user-select: none;
}

.project-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 10px;
  background: #3f4050;
}

.project-header > div {
  width: 50%;
  display: flex;
  align-items: center;
}

.project-header > div:first-child {
  justify-content: flex-start;
}

.project-header-add .el-button {
  width: 100%;
  border: 1px solid #00ff87;
  height: 30px;
  line-height: 7px;
  border-radius: 2px;
  background: #00ff87;
  color: #272632;
}

.project-header-add .el-button.el-button--primary.is-disabled {
  background: #00ff87;
  border-color: #00ff87;
  color: #272632;
}

.project-header-add .el-button--primary:focus,
.project-header-add .el-button--primary:hover {
  background: #00ff87;
  border-color: #00ff87;
  color: #272632;
}

.project-header-add {
  position: relative;
  margin-right: 2%;
}

.project-header-search {
  position: relative;
  width: 40%;
}

.project-header-search .el-input__inner {
  color: rgba(255, 255, 255, 0.4) !important;
  border: 1px solid #585866 !important;
  height: 30px !important;
  background: rgba(39, 38, 50, 0.1);
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.project-header-search .iconicon_stroke_svg_search {
  color: rgba(255, 255, 255, 0.8);
}

.project-header-filter {
  width: 100%;
  text-align: right;
}

.project-header-filter .el-checkbox-button {
  margin-left: 1%;
}

.project-header-filter .el-checkbox-button .el-checkbox-button__inner {
  border-radius: 22px;
  width: 100px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: none;
  height: 30px;
  line-height: 5px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}

.project-header-filter
  .el-checkbox-button.is-checked
  .el-checkbox-button__inner {
  border: 1px solid #00ff87;
  border-radius: 22px;
  color: #00ff87;
  box-shadow: -1px 0 0 0 #00ff87;
}

.project-header-filter .iconfont {
  font-size: 13px;
  margin-right: 10px;
}

.project-table .el-input__inner {
  height: 28px;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(39, 38, 50, 0.1);
  font-size: 12px;
  width: 100%;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

/** 表格样式 **/
.project-table .el-table::before {
  height: 0px;
}

.project-table .el-table__header-wrapper {
  box-shadow: 0px 0px 4px 0 #000817;
}

.project-table .el-table th {
  background: #3f4050;
  color: #ffffff;
}

.project-table .el-table tr {
  background: #272632;
  color: #b0b1b6;
  font-size: 12px;
}

.project-table .el-table td {
  padding: 0px;
  height: 40px;
  line-height: 40px;
}

.project-table .el-table td {
  border-bottom: 1px solid #4c4d59;
}

.project-table .el-table th.is-leaf {
  border-bottom: none;
}

.project-table .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #3f4050 !important;
}

.project-table .el-pagination button,
.el-pagination span:not([class*="suffix"]) {
  color: #ffffff;
}

.project-table .pagination-container {
  height: 40px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0px;
  background: #505264;
  width: 100%;
}

.project-table .el-pagination .el-input__suffix {
  top: 0px;
}

.project-table .el-pagination button {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.project-table .el-pagination button:disabled {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.project-table .el-pager li.active {
  color: #00ff87;
  border: 1px solid #00ff87;
}

.project-table .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #3f4050;
  color: #00ff87;
  border: 1px solid #00ff87;
}

.project-table
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active:hover {
  color: #00ff87 !important;
}

.project-table .el-pagination.is-background .el-pager li {
  background: #3f4050;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.project-table .el-pagination.is-background .el-pager li:hover {
  color: #ffffff !important;
}

.project-table .el-pagination.is-background .btn-prev {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
}

.project-table .el-pagination.is-background .btn-next {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
}

.project-table .el-pagination__editor.el-input .el-input__inner:focus {
  border: 1px solid #ffffff !important;
}

.project-table .el-progress.is-success .el-progress-bar__inner {
  background-color: #00ff87;
}

.project-table .el-progress-bar__outer {
  background-color: #3d3c46;
}

.project-table .el-icon-circle-check:before {
  color: #00ff87;
}

.project-table .el-button {
  width: 80%;
  border: 1px solid #ffffff;
  height: 30px;
  font-size: 12px;
  line-height: 7px;
  border-radius: 2px;
  background: none;
  color: #ffffff;
}

.project-table .el-button.el-button--primary.is-disabled {
  background: none;
  border-color: #ffffff;
  color: #272632;
}

.project-table .el-button--primary:focus,
.project-table .el-button--primary:hover {
  background: none;
  border-color: #ffffff;
  color: #ffffff;
}

.project-table .warn {
  color: #fd852d;
  border: 1px solid #fd852d;
}

.project-table .success {
  color: #00ff87;
  border: 1px solid #00ff87;
}
</style>