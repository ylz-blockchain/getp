<template>
  <div id="process" style="width: 100%; height: 100%;" />
</template>

<script>
import { nowSize } from "@/utils/utils";

export default {
  name: "consumer-process",
  props: {
    data: {
      type: Number,
      required: true,
      default: 100
    }
  },
  data() {
    return {
      chartsFontSize: 36,
      option: {
        title: {
          text: "75%",
          textStyle: {
            color: "#00FF87",
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
                name: "作文得分",
                value: this.data,
                itemStyle: {
                  normal: {
                    color: "#00FF87"
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
    }
  },
  mounted() {
    this.initChart()
  },
  beforeCreate() {
    this.chartsFontSize = nowSize(36);
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(document.getElementById("process"));
      this.chart.setOption(this.option);
    }
  }
}
</script>

<style scoped>
</style>