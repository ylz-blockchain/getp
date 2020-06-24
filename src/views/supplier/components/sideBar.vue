<template>
  <div class="side-bar">
    <ul>
      <li @click="handleAdd" class="side-bar-item">
        <div style="padding-left: 12px;">
          <i class="iconfont iconicon_stroke_svg_add"></i>
          <span>新增节点</span>
        </div>
      </li>

      <li
        v-for="(item, index) in menus"
        :key="index"
        @click="handleChooseMneu(index)"
        class="side-bar-item"
      >
        <div :class="item.choose ? 'side-bar-item-menu is-check' : 'side-bar-item-menu'">
          <div>
            <i :class="item.prefixIcon"></i>
            <span>{{ item.name }}</span>
          </div>
          <div>
            <i :class="item.suffixIcon"></i>
          </div>
        </div>
      </li>
    </ul>

    <add-project :visible.sync="addVisible" />
  </div>
</template>

<script>
import addProject from "./addProject";

export default {
  name: "side-bar",
  components: { addProject },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      addVisible: false,
      menus: [
        {
          id: "0",
          prefixIcon: "iconfont iconicon_stroke_svg_overview",
          name: "概览",
          choose: true,
          suffixIcon: ""
        },
        {
          id: "1",
          prefixIcon: "iconfont iconicon_stroke_svg_phone",
          name: "小米8",
          choose: false,
          suffixIcon: "iconfont iconicon_stroke_svg_run"
        },
        {
          id: "2",
          prefixIcon: "iconfont iconicon_stroke_svg_phone",
          name: "苹果X",
          choose: false,
          suffixIcon: "iconfont iconicon_stroke_svg_free"
        },
        {
          id: "3",
          prefixIcon: "iconfont iconicon_stroke_svg_phone",
          name: "华为mat 30",
          choose: false,
          suffixIcon: "iconfont iconicon_stroke_svg_run"
        },
        {
          id: "4",
          prefixIcon: "iconfont iconicon_stroke_svg_pc",
          name: "电脑类设备Win",
          choose: false,
          suffixIcon: "iconfont iconicon_stroke_svg_free"
        },
        {
          id: "5",
          prefixIcon: "iconfont iconicon_stroke_svg_devide",
          name: "其他类设备矿机",
          choose: false,
          suffixIcon: "iconfont iconicon_stroke_svg_error"
        }
      ]
    };
  },
  methods: {
    handleChooseMneu(index) {
      this.menus.forEach((item, idx) => {
        if (index === idx) {
          item.choose = true;
          this.$emit("update:id", item.id);
        } else {
          item.choose = false;
        }
      });
    },
    handleAdd() {
      this.addVisible = true;
    }
  }
};
</script>

<style>
.side-bar {
  display: flex;
  height: 100%;
  position: relative;
  background: #505264;
  overflow-y: auto;
  flex-direction: column;
}

.side-bar .el-dialog__body {
  padding-bottom: 10px;
}

.side-bar .el-dialog__header,
.side-bar .el-dialog__footer,
.side-bar .el-dialog__body {
  background: #505264;
}

.side-bar .el-dialog__header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.side-bar .el-dialog__title {
  font-size: 13px;
  color: #ffffff;
}

.side-bar .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}

.side-bar .iconfont {
  font-size: 13px;
  margin-right: 12px;
}

.side-bar .side-bar-item:first-child {
  color: #00ff87;
}

.side-bar > ul {
  border-top: solid 1px rgba(255, 255, 255, 0.2);
  padding: 0px;
  margin: 0px;
}

.side-bar-item {
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  height: 40px;
  display: flex;
  align-items: center;
}

.side-bar-item {
  list-style: none;
  cursor: pointer;
}

.iconicon_stroke_svg_add {
  color: #00ff87;
}

.side-bar-item-menu {
  width: 100%;
  padding-left: 12px;
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
}

.side-bar-item-menu > div:first-child {
  width: 80%;
  word-wrap: break-word;
}

.side-bar-item > .is-check {
  background: #3f4050;
}

.iconicon_stroke_svg_run {
  color: #00ff87;
}

.iconicon_stroke_svg_error {
  color: #fd852d;
}
</style>