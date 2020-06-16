<template>
  <div id="resource" style="width: 100%; height: 100%;" />
</template>

<script>
export default {
  name: "consumer-resource",
  data() {
    return {
      option: {
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
          data: this.data.x
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
                color: '#00FF87'
              }
            },
            data: this.data.y,
            type: "line"
          }
        ]
      }
    };
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(document.getElementById("resource"));
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style scoped>
</style>