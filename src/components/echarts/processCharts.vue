<template>
  <div :id="id" style="width: 100%; height: 100%;" />
</template>

<script>
import { nowSize } from "@/utils/utils";

export default {
  name: "process-charts",
  props: {
    id: {
      type: String,
      required: true
    },
    data: {
      type: Number,
      required: false
    },
    processColor: {
      type: String,
      required: true
    }
  },
  watch: {
    data(newVal) {
      this.setOption();
      this.initChart();
    }
  },
  data() {
    return {
      chartsFontSize: 36,
      option: {
        title: {
          text: "0%",
          textStyle: {
            color: "#FFFFFF",
            fontSize: this.chartsFontSize
          },
          left: "center",
          top: "center"
        },
        angleAxis: {
          max: 100, // 满分
          clockwise: true, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: "category",
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ["50%", "50%"],
          radius: "150%" //图形大小
        },
        series: [
          {
            type: "bar",
            data: [
              {
                name: "进度",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#FFFFFF"
                  }
                }
              }
            ],
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 12,
            barGap: "-100%",
            z: 2
          },
          {
            type: "bar",
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "rgba(255, 255, 255, 0.1)",
                  shadowColor: "rgba(0, 0, 0, 0.2)",
                  shadowBlur: 5,
                  shadowOffsetY: 2
                }
              }
            ],
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: 12,
            barGap: "-100%",
            z: 1
          }
        ]
      }
    };
  },
  mounted() {
    this.setOption();
    this.initChart();
  },
  beforeCreate() {
    this.chartsFontSize = nowSize(36);
  },
  methods: {
    setOption() {
      this.option.title.textStyle.color = this.processColor;
      this.option.series[0].data[0].itemStyle.normal.color = this.processColor;
      this.option.series[0].data[0].value =
        this.data != undefined ? this.data : 0;
      this.option.title.text = this.data != undefined ? this.data + "%" : "--";
    },
    initChart() {
      if (this.data != undefined) {
        this.chart = this.$echarts.init(document.getElementById(this.id));
        this.chart.setOption(this.option);

        let _this = this;
        window.addEventListener("resize", () => {
          _this.chart.resize();
        });
      }
    }
  }
};
</script>

<style scoped>
</style>