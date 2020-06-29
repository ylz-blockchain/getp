<template>
  <div class="project">
    <!-- 头部 -->
    <div class="project-header">
      <!-- 添加项目与搜索 -->
      <div>
        <div class="project-header-add">
          <cover-button @click.native="handleAddProject">新增项目</cover-button>

          <add-project :visible.sync="addProjectVisible" @handleSuccess="addProjectSuccess" />
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

    <!-- 表格 -->
    <div class="project-table">
      <search-table :selectShow="false" :data="projectRecord">
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="startTime" align="center" label="起始时间"></el-table-column>
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
      </search-table>
    </div>

    <div :style="{opacity: addMessageVisible}" class="project-add-message">项目创建成功，等待审核...</div>
  </div>
</template>

<script>
import coverButton from "@/components/button";
import { message } from "@/utils/utils";
import addProject from "./components/addProject";
import searchTable from "@/components/searchTable";

export default {
  name: "project-manager",
  components: { coverButton, addProject, searchTable },
  data() {
    return {
      searchContent: undefined,
      listQuery: {
        filterCheck: [0, 1, 2]
      },
      addProjectVisible: false,
      addMessageVisible: 0,
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
    addProjectSuccess() {
      this.addMessageVisible = 1;
      let _this = this;
      setTimeout(function() {
        _this.addMessageVisible = 0;
      }, 3000);
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
  z-index: 100;
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
  font-family: Noto Sans SC;
  font-weight: 400;
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

.project-table {
  position: absolute;
  height: 100%;
  width: 100%;
}

.project-table .table-main {
  top: 52px;
}

.project-table .table-main .el-table tr {
  background: #272632;
  height: 40px;
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

.project-add-message {
  position: absolute;
  left: 0;
  right: 0;
  top: 5.5%;
  margin: 0 auto;
  width: 220px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  font-size: 13px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #00ff87;
  z-index: 9999;
  transition: opacity 1s;
}
</style>