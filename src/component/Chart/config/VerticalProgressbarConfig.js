import echartUtils from '../../../util/echartUtil';
var echarts = require('echarts');

export const VerticalProgressbarConfig = {

  grid: {
      borderWidth: 0,
      left:  echartUtils.getDprValue(50),
      top: echartUtils.getDprValue(30),
      right: echartUtils.getDprValue(50),
      bottom: echartUtils.getDprValue(50)
  },
  legend: {
    textStyle: {
        color: '#999999',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: echartUtils.getDprValue(12),
    }
  },
  tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'cross',
          crossStyle: {
              color: '#999'
          }
      },
      formatter: '{a0}-{b0}: {c0}',
      textStyle: {
        color: '#FFF',
        fontSize: echartUtils.getDprValue(12)
      }
  },
    xAxis: {
      type: 'category',
      nameGap: echartUtils.getDprValue(20),
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: echartUtils.getDprValue(12)
      },
        axisLabel: {
            width:90,
            rotate:30,
            inside: false,
            interval: 0,
            margin: 8,
            textStyle: {
                color: '#999',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: 'sans-serif',
                fontSize: echartUtils.getDprValue(12),
            },
            //x轴文字过长处理
            formatter: function(category) {
              if(category === undefined) return;
              var relVal = category.length>5 ? category.substring(0,6)+'...' : category;
              return relVal;
            }

        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
      name: '(万元)',
      nameTextStyle:{
        color: '#999',
        fontSize: echartUtils.getDprValue(10),
      },
      nameLocation:'end',

        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {

            width:150,
            textStyle: {
                color: '#999',
                fontSize: echartUtils.getDprValue(10),
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barWidth:'50%',
            animation: false
        },
        {
            type: 'bar',
            barWidth:'50%',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            }
        }
    ]
};
