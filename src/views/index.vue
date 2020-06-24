<template>
  <div class="index">
    <div class="index-background">
      <index-map-charts />
    </div>

    <div class="index-top">
      <img src="@/assets/index_top.png" />
      <div>超算地球全球算力监控中心</div>
    </div>

    <div class="index-left">
      <img src="@/assets/index_left.png" />
      <img class="index-left-focus" src="@/assets/index_focus_left.png" />
      <div class="index-list" ref="leftList">
        <div class="index-list-title">
          <div>算力热度榜</div>
          <div class="index-list-title-button" @click="handleLogin(1)">
            <img src="@/assets/index_btn_left.png" />
            <div>加入</div>
          </div>
        </div>

        <ul>
          <li
            v-for="(item, index) in consumerUsers"
            :key="index"
            :style="{backgroundImage: item.liStyle.background, color: item.liStyle.color}"
            class="index-list-item"
          >
            <div :style="{background: item.divStyle.background}">
              <img :style="{opacity: item.imgStyle.opacity}" :src="item.icon" />
            </div>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="index-right">
      <img class="index-right-focus" src="@/assets/index_focus_right.png" />
      <img src="@/assets/index_right.png" />
      <div class="index-list" ref="rightList">
        <div class="index-list-title">
          <div class="index-list-title-button" @click="handleLogin(0)">
            <img src="@/assets/index_btn_right.png" />
            <div>加入</div>
          </div>
          <div>算力贡献榜</div>
        </div>

        <ul>
          <li
            v-for="(item, index) in supplierUsers"
            :key="index"
            :style="{backgroundImage: item.liStyle.background, color: item.liStyle.color}"
            class="index-list-item"
          >
            <span>{{item.name}}</span>
            <div :style="{background: item.divStyle.background}">
              <img :style="{opacity: item.imgStyle.opacity}" :src="item.icon" />
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="index-bottom">
      <img src="@/assets/index_bottom.png" />
      <ul>
        <li>
          <img src="@/assets/index_statistics.png" />
          <div class="index-bottom-item">
            <img src="@/assets/icon_stroke_svg_country.png" />
            <span>国家和地区</span>
            <span>200</span>
          </div>
        </li>
        <li>
          <img src="@/assets/index_statistics.png" />
          <div class="index-bottom-item">
            <img src="@/assets/icon_stroke_svg_node.png" />
            <span>节点</span>
            <span>23141W</span>
          </div>
        </li>
        <li>
          <img src="@/assets/index_statistics.png" />
          <div class="index-bottom-item">
            <img src="@/assets/icon_stroke_svg_cpu.png" />
            <span>cpu</span>
            <span>213152P</span>
          </div>
        </li>
        <li>
          <img src="@/assets/index_statistics.png" />
          <div class="index-bottom-item">
            <img src="@/assets/icon_stroke_svg_memory.png" />
            <span>内存</span>
            <span>213152P</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import indexMapCharts from "@/components/echarts/indexMapCharts";

let defalutConsumerIcon = require("@/assets/icon_stroke_svg_hot.png");
let upConsumerIcon = require("@/assets/icon_stroke_svg_hotup.png");
let downConsumerIcon = require("@/assets/icon_stroke_svg_hotdown.png");

export default {
  name: "index",
  components: { indexMapCharts },
  data() {
    return {
      consumerUsers: [
        {
          type: 1, // 0 hot 1 up 2 down
          liStyle: {
            background:
              "linear-gradient(to left,rgba(80, 82, 100, 0),rgba(80, 82, 100, 1))",
            color: "rgba(255, 255, 255, 0.9)"
          },
          divStyle: {
            background: "#424453"
          },
          imgStyle: {
            opacity: "1.0"
          },
          name: "北京市风沙治理近二十年"
        },
        {
          type: 0, // 0 hot 1 up 2 down
          liStyle: {
            background:
              "linear-gradient(to left,rgba(80, 82, 100, 0),rgba(80, 82, 100, 1))",
            color: "rgba(255, 255, 255, 0.9)"
          },
          divStyle: {
            background: "#424453"
          },
          imgStyle: {
            opacity: "1.0"
          },
          name: "湖南省辣椒消耗量评估"
        },
        {
          type: 1, // 0 hot 1 up 2 down
          liStyle: {
            background:
              "linear-gradient(to left,rgba(80, 82, 100, 0),rgba(80, 82, 100, 1))",
            color: "rgba(255, 255, 255, 0.9)"
          },
          divStyle: {
            background: "#424453"
          },
          imgStyle: {
            opacity: "1.0"
          },
          name: "土地利用分析"
        },
        {
          type: 0, // 0 hot 1 up 2 down
          liStyle: {
            background:
              "linear-gradient(to left,rgba(80, 82, 100, 0),rgba(80, 82, 100, 1))",
            color: "rgba(255, 255, 255, 0.9)"
          },
          divStyle: {
            background: "#424453"
          },
          imgStyle: {
            opacity: "1.0"
          },
          name: "深圳南山区"
        }
      ],
      supplierUsers: [
        {
          icon: require("@/assets/icon_stroke_svg_medal1.png"),
          liStyle: {
            background:
              "linear-gradient(to right,rgba(80, 82, 100, 0),rgba(80, 82, 100, 1))",
            color: "rgba(255, 255, 255, 0.9)"
          },
          divStyle: {
            background: "#414351"
          },
          imgStyle: {
            opacity: "1.0"
          },
          name: "乌班鱼的舰长"
        },
        {
          icon: require("@/assets/icon_stroke_svg_medal2.png"),
          liStyle: {
            background:
              "linear-gradient(to right,rgba(80, 82, 100, 0),rgba(80, 82, 100, 1))",
            color: "rgba(255, 255, 255, 0.9)"
          },
          divStyle: {
            background: "#414351"
          },
          imgStyle: {
            opacity: "1.0"
          },
          name: "Triste"
        },
        {
          icon: require("@/assets/icon_stroke_svg_medal3.png"),
          liStyle: {
            background:
              "linear-gradient(to right,rgba(80, 82, 100, 0),rgba(80, 82, 100, 1))",
            color: "rgba(255, 255, 255, 0.9)"
          },
          divStyle: {
            background: "#414351"
          },
          imgStyle: {
            opacity: "1.0"
          },
          name: "Terri Terri"
        }
      ]
    };
  },
  created() {
    this.loadConsumerList();
  },
  mounted() {
    const leftListHeight =
      this.$refs.leftList.offsetHeight -
      40 -
      this.$refs.leftList.offsetHeight * 0.05;

    if (leftListHeight > 350) {
      const defaultCount = Math.round(leftListHeight / 35);

      if (this.consumerUsers.length > defaultCount - 9) {
        let styleCount = 9;
        let finalCount = 0;

        for (let i = defaultCount - 9; i < defaultCount; i++) {
          if (this.consumerUsers[i] != undefined) {
            this.consumerUsers[i].liStyle.background =
              "linear-gradient(to left,rgba(80, 82, 100, 0), rgba(80, 82, 100, 0." +
              styleCount +
              "))";
            this.consumerUsers[i].liStyle.color =
              "rgba(255, 255, 255, 0." + styleCount + ")";
            this.consumerUsers[i].divStyle.background =
              "rgba(66, 68, 83, 0." + styleCount + ")";
            this.consumerUsers[i].imgStyle.opacity = "0." + styleCount;

            styleCount--;
            finalCount = i;
          }
        }

        this.consumerUsers.splice(
          finalCount + 1,
          this.consumerUsers.length - finalCount
        );
      }
    } else {
      let styleCount = 9;

      for (let i = 0; i < this.consumerUsers.length; i++) {
        if (this.consumerUsers[i] != undefined) {
          this.consumerUsers[i].liStyle.background =
            "linear-gradient(to left,rgba(80, 82, 100, 0), rgba(80, 82, 100, 0." +
            styleCount +
            "))";
          this.consumerUsers[i].liStyle.color =
            "rgba(255, 255, 255, 0." + styleCount + ")";
          this.consumerUsers[i].divStyle.background =
            "rgba(66, 68, 83, 0." + styleCount + ")";
          this.consumerUsers[i].imgStyle.opacity = "0." + styleCount;

          styleCount--;
        }
      }
    }

    const rightListHeight =
      this.$refs.rightList.offsetHeight -
      40 -
      this.$refs.rightList.offsetHeight * 0.05;

    if (rightListHeight > 350) {
      const defaultCount = Math.round(rightListHeight / 35);

      if (this.supplierUsers.length > defaultCount - 9) {
        let styleCount = 9;
        let finalCount = 0;

        for (let i = defaultCount - 9; i < defaultCount; i++) {
          if (this.supplierUsers[i] != undefined) {
            this.supplierUsers[i].liStyle.background =
              "linear-gradient(to right,rgba(80, 82, 100, 0), rgba(80, 82, 100, 0." +
              styleCount +
              "))";
            this.supplierUsers[i].liStyle.color =
              "rgba(255, 255, 255, 0." + styleCount + ")";
            this.supplierUsers[i].divStyle.background =
              "rgba(65, 67, 81, 0." + styleCount + ")";
            this.supplierUsers[i].imgStyle.opacity = "0." + styleCount;

            styleCount--;
            finalCount = i;
          }
        }

        this.supplierUsers.splice(
          finalCount + 1,
          this.supplierUsers.length - finalCount
        );
      }
    } else {
      let styleCount = 9;

      for (let i = 0; i < this.supplierUsers.length; i++) {
        if (this.supplierUsers[i] != undefined) {
          this.supplierUsers[i].liStyle.background =
            "linear-gradient(to right,rgba(80, 82, 100, 0), rgba(80, 82, 100, 0." +
            styleCount +
            "))";
          this.supplierUsers[i].liStyle.color =
            "rgba(255, 255, 255, 0." + styleCount + ")";
          this.supplierUsers[i].divStyle.background =
            "rgba(65, 67, 81, 0." + styleCount + ")";
          this.supplierUsers[i].imgStyle.opacity = "0." + styleCount;

          styleCount--;
        }
      }
    }
  },
  methods: {
    loadConsumerList() {
      for (let i = 0; i < 25; i++) {
        this.consumerUsers.push({
          type: 0, // 0 hot 1 up 2 down
          liStyle: {
            background:
              "linear-gradient(to left,rgba(80, 82, 100, 0),rgba(80, 82, 100, 1))",
            color: "rgba(255, 255, 255, 0.9)"
          },
          divStyle: {
            background: "#424453"
          },
          imgStyle: {
            opacity: "1.0"
          },
          name: "土地利用分析"
        });
      }

      this.consumerUsers.forEach(item => {
        switch (item.type) {
          case 0:
            item.icon = defalutConsumerIcon;
            break;
          case 1:
            item.icon = upConsumerIcon;
            break;
          case 2:
            item.icon = downConsumerIcon;
            break;
          default:
            item.icon = defalutConsumerIcon;
            break;
        }
      });

      for (let i = 0; i < 30; i++) {
        this.supplierUsers.push({
          icon: require("@/assets/icon_stroke_svg_medal4.png"),
          liStyle: {
            background:
              "linear-gradient(to right,rgba(80, 82, 100, 0),rgba(80, 82, 100, 1))",
            color: "rgba(255, 255, 255, 0.9)"
          },
          divStyle: {
            background: "#414351"
          },
          imgStyle: {
            opacity: "1.0"
          },
          name: "test"
        });
      }
    },
    handleLogin(type) {
      this.$router.push({ path: "/login", query: { type: type } });
    }
  }
};
</script>

<style>
.index {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.index-background {
  position: absolute;
  width: 100%;
  height: 100%;
}

.index-top {
  position: absolute;
  top: 5px;
  left: 0;
  right: 0;
  height: 10%;
  width: 75%;
  color: #00ff87;
  margin: 0 auto;
  font-family: Noto Sans SC;
  font-weight: bold;
  font-size: 3.2vh;
}

.index-top > img {
  width: 100%;
  height: 73.5%;
}

.index-top > div {
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  height: 50%;
  align-items: center;
  justify-content: center;
}

.index-left {
  position: fixed;
  display: flex;
  align-items: center;
  top: 5px;
  left: 5px;
  height: 99%;
  width: auto;
}

.index-left > img {
  width: auto;
  height: 100%;
}

.index-left-focus {
  height: 85% !important;
  position: absolute;
  left: 85%;
}

.index-right {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 5px;
  right: 5px;
  height: 99%;
  width: auto;
}

.index-right > img {
  width: auto;
  height: 100%;
}

.index-right-focus {
  height: 85% !important;
  position: absolute;
  right: 85%;
}

.index-list {
  position: absolute;
  top: 1%;
  left: 10%;
  width: 80%;
  height: 96%;
  overflow: hidden;
}

.index-list-title {
  display: flex;
  align-items: center;
  color: #00ff87;
  font-size: 1.8vh;
  font-family: Noto Sans SC;
  font-weight: bold;
  position: relative;
  height: 40px;
}

.index-list-title > div {
  display: flex;
  align-items: center;
  height: 100%;
}

.index-left .index-list-title > div:first-child {
  width: 100%;
}
.index-right .index-list-title > div:last-child {
  width: 100%;
  justify-content: flex-end;
}

.index-list-title-button {
  position: relative;
  width: auto;
}

.index-left .index-list-title-button {
  justify-content: flex-end;
}

.index-list-title-button > img {
  width: auto;
  height: 55%;
  cursor: pointer;
}

.index-list-title-button > div {
  position: absolute;
  color: #272632;
  font-size: 1.5vh;
  text-align: center;
  width: 100%;
  cursor: pointer;
}

.index-list > ul {
  margin: 0;
  margin-top: 5%;
  padding: 0;
}

.index-list-item {
  list-style: none;
  font-size: 1.2vh;
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.index-list-item > div {
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #424453;
}

.index-left .index-list-item > div {
  margin-right: 10%;
}

.index-right .index-list-item > div {
  margin-left: 10%;
}

.index-right .index-list-item {
  justify-content: flex-end;
}

.index-list-item img {
  height: 22px;
  width: 22px;
}

.index-bottom {
  position: fixed;
  width: 90%;
  bottom: 5px;
  left: 0;
  right: 0;
  height: 15%;
  margin: 0 auto;
}

.index-bottom > img {
  width: 100%;
  height: 100%;
}

.index-bottom > ul {
  bottom: 40%;
  position: absolute;
  width: 80%;
  justify-content: space-around;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0px;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.index-bottom li {
  list-style: none;
  flex: 1;
  position: relative;
}

.index-bottom li > img {
  width: 45%;
  height: 45%;
}

.index-bottom-item {
  position: absolute;
  left: 0;
  right: 0;
  width: 45%;
  top: 0;
  display: flex;
  margin: 0px auto;
  flex-direction: column;
  color: #00ff87;
  font-family: Noto Sans SC;
  font-weight: bold;
  font-size: 1.5vh;
  height: 100%;
  padding-top: 10%;
}

.index-bottom-item img {
  width: 30%;
  height: auto;
  margin: 0px auto;
}
</style>