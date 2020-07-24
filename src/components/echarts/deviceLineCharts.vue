<template>
  <div id="deviceLine" style="width: 100%; height: 100%;" />
</template>

<script>
export default {
  name: "device-line-charts",
  data() {
    return {
      option: {
        grid: {
          left: "3%",
          right: "3%",
          bottom: "12%"
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            var result = params[0].axisValue + "</br>";
            params.forEach(function(item) {
              result +=
                item.marker +
                " " +
                item.seriesName +
                " : " +
                item.value +
                "%" +
                "</br>";
            });
            return result;
          },
          transitionDuration: 0 // 【bug】鼠标移入Echarts屏幕抖动
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
          }
        },
        yAxis: {
          type: "category",
          data: [0, 20, 40, 60, 80, 100],
          axisLabel: {
            //设置y轴数值为%
            formatter: "{value} %"
          },
          axisLine: {
            lineStyle: {
              color: "#FFFFFF"
            }
          },
          axisTick: {
            show: false
          }
        },
        legend: {
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)"
          },
          left: "3%",
          right: "3%",
          top: "5%",
          data: ["cpu使用率", "存储空间使用率", "带宽使用率"]
        },
        textStyle: {
          color: ["rgba(255, 255, 255, 0.8)"]
        },
        series: [
          {
            name: "cpu使用率",
            type: "line",
            color: "#00FF87",
            smooth: true
          },
          {
            name: "存储空间使用率",
            type: "line",
            color: "#6F86FF",
            smooth: true
          },
          {
            name: "带宽使用率",
            type: "line",
            color: "#00DBE8",
            smooth: true
          }
        ]
      }
    };
  },
  props: {
    data: {
      type: Object,
      default: undefined
    }
  },
  watch: {
    data(newVal) {
      this.initChart();
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      if (this.data == undefined) {
        this.option.yAxis.type = "category";
        this.option.yAxis.data = [0, 20, 40, 60, 80, 100];
        this.option.xAxis.data = [
          "6:00",
          "7:00",
          "8:00",
          "9:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00"
        ];
      } else {
        this.option.yAxis.type = "value";
        this.option.xAxis.data = this.data.x;
        this.option.series[0].data = this.data.y.cpuUsages;
        this.option.series[1].data = this.data.y.diskUsages;
        this.option.series[2].data = this.data.y.bandwidthUsages;
      }
      this.chart = this.$echarts.init(document.getElementById("deviceLine"));
      this.chart.setOption(this.option);

      let _this = this;
      window.onresize = function() {
        _this.chart.resize();
      };
    }
  }
};
</script>

<style scoped>
</style>