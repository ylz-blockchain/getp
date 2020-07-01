<template>
  <div class="table" ref="table">
    <div v-if="selectShow" class="table-search">
      <div>
        <el-input v-model="content" placeholder="请输入搜索内容"></el-input>
        <span class="show-search" @click="handleSearch">
          <i class="iconfont iconicon_stroke_svg_search"></i>
        </span>
      </div>
    </div>

    <div class="table-main">
      <el-table :max-height="maxHeight" :data="list" style="width: 100%">
        <slot></slot>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="query.pageNo"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="query.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagetotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-table",
  props: {
    data: {
      type: Array,
      required: true
    },
    height: {
      type: Number,
      required: false
    },
    selectShow: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      required: false
    }
  },
  watch: {
    total(newVal) {
      this.pagetotal = newVal;
    },
    data(newVal) {
      this.list = newVal;
    }
  },
  data() {
    return {
      content: undefined,
      query: {
        pageNo: 1,
        pageSize: 10,
        sortProp: undefined,
        sortType: undefined
      },
      pagetotal: undefined,
      maxHeight: 500,
      list: []
    };
  },
  methods: {
    handleSizeChange() {
      this.$emit("handleSizeChange", this.query);
    },
    handleCurrentChange() {
      this.$emit("handleCurrentChange", this.query);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query, this.content);
    }
  },
  mounted() {
    this.list = this.data;
    this.pagetotal = this.total;
    if (this.height != undefined) {
      this.maxHeight = this.height;
    } else {
      this.maxHeight = this.$refs.table.offsetHeight - 82;
    }
  }
};
</script>

<style>
.table {
  height: 100%;
  position: relative;
}

.table-search {
  height: 40px;
  background: #3f4050;
  padding-left: 5px;
  line-height: 40px;
}

.table-search > div {
  position: relative;
  width: 320px;
}

.table-search .show-search {
  position: absolute;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}

.table-search .iconicon_stroke_svg_search {
  color: rgba(255, 255, 255, 0.8);
}

.table-search .el-input__inner {
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid #585866 ;
  background: none;
  height: 30px;
}

.table-search ::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgba(255, 255, 255, 0.4) !important;
}

.table-search ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(255, 255, 255, 0.4) !important;
}

.table-search :-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgba(255, 255, 255, 0.4) !important;
}


/** 表格部分 **/
.table-main {
  top: 42px;
  bottom: 0;
  width: 100%;
  position: absolute;
}

.table-main .el-input__inner {
  color: #FFFFFF;
  border: 1px solid #585866;
  height: 30px;
  background: rgba(39, 38, 50, 0.1);
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.table-main .el-table::before {
  height: 0px;
}

.table-main .el-table__empty-text {
  color: rgba(255, 255, 255, 0.8);
}

.table-main .el-table, .el-table__expanded-cell {
  background: none;
}

.table-main .el-table__header-wrapper {
  box-shadow: 0px 0px 4px 0 #000817;
}

.table-main .el-table th {
  background: #3f4050;
  color: #ffffff;
}

.table-main .el-table tr {
  background: #393a48;
  color: #b0b1b6;
  font-size: 12px;
}

.table-main .el-table td {
  padding: 0px;
  height: 35px;
  line-height: 35px;
}

.table-main .el-table td {
  border-bottom: 1px solid #4c4d59;
}

.table-main .el-table th.is-leaf {
  border-bottom: none;
}

.table-main .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #3f4050 !important;
}

.table-main .el-pagination button,
.el-pagination span:not([class*="suffix"]) {
  color: #ffffff;
}

.table-main .pagination-container {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #3f4050;
  position: absolute;
  bottom: 0px;
}

.table-main .el-pagination .el-input__suffix {
  top: 0px;
}

.table-main .el-pagination button {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.table-main .el-pagination button:disabled {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.table-main .el-pager li.active {
  color: #00ff87;
  border: 1px solid #00ff87;
}

.table-main .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #3f4050;
  color: #00ff87;
  border: 1px solid #00ff87;
}

.table-main
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active:hover {
  color: #00ff87 !important;
}

.table-main .el-pagination.is-background .el-pager li {
  background: #3f4050;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.table-main .el-pagination.is-background .el-pager li:hover {
  color: #ffffff !important;
}

.table-main .el-pagination.is-background .btn-prev {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
}

.table-main .el-pagination.is-background .btn-next {
  background: #3f4050;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
}

.table-main .el-pagination__editor.el-input .el-input__inner:focus {
  border: 1px solid #ffffff !important;
}
</style>