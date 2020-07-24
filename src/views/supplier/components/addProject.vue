<template>
  <el-dialog
    title="新增节点"
    :visible="adddVisible"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :icon="false"
    width="60%"
  >
    <div class="add-project">
      <div v-if="active == 0" class="add-project-main">
        新增节点图文教程
        <p />关于节点运作的说明，安全，需要注意的事项，设备的损耗，收益等各方面等说明。关于节点运作的说明，安全，需要注意的事项，设备的损耗，收益等各方面等说明。关于节点运作的说明，安全，需要注意的事项，设备的损耗，收益等各方面等说明。关于节点运作的说明，安全，需要注意的事项，设备的损耗，收益等各方面等说明。关于节点运作的说明，安全，需要注意的事项，设备的损耗，收益等各方面等说明。
        <p />节点安装教教程
        <p />1，pc端或其他设备下载地址
        <br />
        <span class="add-project-main-click">下载链接，跳转到新标签页</span>
        <br />手机端下载，扫描二维码下载
        <br />
        <span class="add-project-main-click">二维码</span>
        <br />2，安装
        <br />
        <span class="add-project-main-click">安装截图</span>
        <br />3，输入安装码，手机端使用扫描二维码的方式添加安装码
        <br />提交安装码与运算方账户进行关联
        <br />
      </div>

      <div v-if="active == 1" class="add-project-wait">节点关联中，请稍候...</div>
      <div v-if="active == 2" style="color: #00FF87; font-size: 4vh;" class="add-project-wait">添加成功！</div>
      <div v-if="active == 3" style="color: #FD852D; font-size: 4vh;" class="add-project-wait">添加失败！</div>

      <div class="add-project-bottom">
        <div>
          <el-input v-if="active == 0" v-model="installCode" placeholder="请输入设备安装码" />
        </div>
        <div v-if="active == 0" class="add-project-bottom-button1">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleNext(1)">添加节点</el-button>
        </div>

        <div v-if="active == 2" class="add-project-bottom-button2">
          <el-button @click="handleClose">确定</el-button>
        </div>

        <div v-if="active == 3" class="add-project-bottom-button1">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleNext(0)">重新添加</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { message } from "@/utils/utils";
import { addNode } from "@/api/supplier/index";

export default {
  name: "add-project",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      adddVisible: false,
      installCode: undefined
    };
  },
  watch: {
    visible(newVal) {
      this.adddVisible = newVal;
      if (newVal) {
        this.installCode = undefined;
        this.active = 0;
      }
    }
  },
  methods: {
    handleClose() {
      this.adddVisible = false;
      this.$emit("update:visible", false);
    },
    handleNext(step) {
      if (step == 1) {
        if (this.installCode != undefined && this.installCode != "") {
          this.active = step;
          addNode(this.installCode)
            .then(res => {
              this.active = 2;
            })
            .catch(error => {
              this.active = 3;
            });
        } else {
          message("请输入安装码", "error");
        }
      } else {
        this.active = step;
      }
    }
  }
};
</script>

<style>
.add-project {
  color: rgba(255, 255, 255, 0.8);
}

.add-project-main {
  height: 400px;
  font-size: 13px;
}

.add-project-wait {
  height: 400px;
  line-height: 400px;
  text-align: center;
  font-size: 2vh;
  font-family: Noto Sans SC;
  font-weight: bold;
}

.add-project-main-click {
  color: #00ff87;
}

.add-project-bottom {
  display: flex;
  height: 40px;
  justify-content: space-between;
}

.add-project-bottom > div:first-child {
  width: 50%;
}

.add-project-bottom .el-input__inner {
  height: 35px;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(39, 38, 50, 0.1);
  font-size: 12px;
  width: 65%;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.add-project-bottom > div:last-child {
  width: 50%;
  display: flex;
  justify-content: flex-end;
}

.add-project-bottom .el-button {
  border-radius: 2px;
  height: 35px;
  line-height: 7px;
}

.add-project-bottom .el-button.el-button--primary.is-disabled {
  background: none;
  border-color: rgba(255, 255, 255, 0.8);
}

.add-project-bottom .el-button--primary:focus,
.add-project-bottom .el-button--primary:hover {
  background: none;
  border-color: rgba(255, 255, 255, 0.8);
}

.add-project-bottom-button1 .el-button:first-child {
  width: 20%;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: none;
  color: rgba(255, 255, 255, 0.8);
}

.add-project-bottom-button1 .el-button:last-child {
  width: 40%;
  border: none;
  background: #00ff87;
  color: #272632;
}

.add-project-bottom-button2 .el-button {
  width: 40%;
  border: none;
  background: #00ff87;
  color: #272632;
}
</style>