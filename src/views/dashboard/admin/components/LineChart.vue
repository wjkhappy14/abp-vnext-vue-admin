<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '80%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      ...mapActions({
        monthClothLength: "summary/monthClothLength"
      }),
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.monthClothLength().then((items) => {
          this.setOptions(items)
        });
      },
      setOptions(items) {
        const legends = Object.keys(items);
        const xAxis = items[legends[0]].map(item => {
          return item.key;
        });
        this.chart.setOption(
          {
            xAxis: {
              data: xAxis,
              boundaryGap: false,
              axisTick: {
                show: false
              }
            },
            grid: {
              left: 10,
              right: 10,
              bottom: 20,
              top: 30,
              containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              },
              padding: [5, 10]
            },
            yAxis: {
              axisTick: {
                show: false
              }
            },
            legend: {
              data: legends
            },
            series: [
              {
                name: legends[0],
                itemStyle: {
                  normal: {
                    color: '#FF005A',
                    lineStyle: {
                      color: '#FF005A',
                      width: 2
                    }
                  }
                },
                smooth: true,
                type: 'line',
                data: [0, 1, 2, 3, 4, 5, 16, 7, 8, 9, 1, 11],
                animationDuration: 2800,
                animationEasing: 'cubicInOut'
              },
              {
                name: legends[1],
                smooth: true,
                type: 'line',
                itemStyle: {
                  normal: {
                    color: '#3888fa',
                    lineStyle: {
                      color: '#3888fa',
                      width: 2
                    },
                    areaStyle: {
                      color: '#f3f8ff'
                    }
                  }
                },
                data: [10, 1, 12, 3, 4, 5, 6, 7, 18, 9, 10, 11],
                animationDuration: 2800,
                animationEasing: 'quadraticOut'
              }]
          })
      }
    }
  }
</script>
