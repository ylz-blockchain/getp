<template>
  <div id="line" style="width: 100%; height: 100%;" />
</template>

<script>
export default {
  name: "line-charts",
  data() {
    return {
      option: {
        grid: {
          left: "3.5%",
          right: "3%",
          bottom: "12%"
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#FFFFFF"
            }
          },
          axisTick: {
            show: false
          },
          data: []
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#FFFFFF"
            }
          },
          axisTick: {
            show: false
          }
        },
        textStyle: {
          color: ["rgba(255, 255, 255, 0.8)"]
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: "#00FF87"
              }
            },
            data: [],
            type: "line"
          }
        ]
      }
    };
  },
  props: {
    data: {
      type: Object,
      required: false
    },
    titleShow: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.initChart();
  },
  watch: {
    data(newVal) {
      this.initChart();
    }
  },
  methods: {
    initChart() {
      if (this.data != undefined) {
        if (this.titleShow) {
          this.option.title = {
            left: "3%",
            top: "6%",
            text: "单位：积分/天",
            textStyle: {
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 14,
              fontWeight: "normal"
            }
          };
        }

        this.option.xAxis.data = this.data.x;
        this.option.series[0].data = this.data.y;
        this.chart = this.$echarts.init(document.getElementById("line"));
        this.chart.setOption(this.option);

        let _this = this;
        window.onresize = function() {
          _this.chart.resize();
        };
      }
    }
  }
};
</script>

<style scoped>
</style>