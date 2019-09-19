import echartUtils from '../../../util/echartUtil';
export const GrossProfitConfig = {
    //图表距离外边距离
    grid: {
        borderWidth: 0,
        left:  echartUtils.getDprValue(50),
        top: echartUtils.getDprValue(30),
        bottom: echartUtils.getDprValue(40)
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
    xAxis: [
        {
            type: 'category',
            axisPointer: {
                type: 'shadow'
            },
            name: '月份',
            nameGap: echartUtils.getDprValue(20),
            nameLocation: 'middle',
            nameTextStyle: {
              fontSize: echartUtils.getDprValue(12)
            },
            axisLabel: {
              interval: 0,
              margin: 8,
              textStyle: {
                color: '#333',
                fontSize: echartUtils.getDprValue(12)
              },
              //x轴文字过长处理
              formatter: function(category) {
                if(category === undefined) return;
                var relVal = category.length>5 ? category.substring(0,6)+'...' : category;
                return relVal;
              }
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            nameTextStyle: {
              color: '#333',
              fontSize: echartUtils.getDprValue(12)
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                  color: '#999999',
                  fontSize: echartUtils.getDprValue(12)
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                  color: ['#999999'],
                  type: 'dashed'
                }
            }
        },
        {
          "nameTextStyle": {
            "color": "#FFFFFF",
            "fontSize": 0
          }
        }

    ],
    series: [
        {
            type:'line',
            smooth: true,
            lineStyle: {  //阴影效果
                normal: {
                    width: 3,
                    shadowColor: 'rgba(0,0,0,0.4)',
                    shadowBlur: 10,
                    shadowOffsetY: 10
                }
            },
            itemStyle: {
              normal: {
                color: '#5A95F0',			//条形图颜色
                barBorderRadius: 1
              },
              emphasis: {
                color: '#5A95F0',			//点击后的条形图颜色
                barBorderRadius: 1
              }
           }
        },
        {
            type:'line',
            smooth: true,
            lineStyle: {  //阴影效果
                normal: {
                    width: 3,
                    shadowColor: 'rgba(0,0,0,0.4)',
                    shadowBlur: 10,
                    shadowOffsetY: 10
                }
            },
            itemStyle: {
              normal: {
                color: '#FF9393',			//条形图颜色
                barBorderRadius: 1
              },
              emphasis: {
                color: '#FF9393',			//点击后的条形图颜色
                barBorderRadius: 1
              }
           }
        }
    ]
}
