import echartUtils from '../../../util/echartUtil';
var echarts = require('echarts');

export const LineProgressbarConfig = {

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
      type: 'value'
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
      {
        name:'天海湾',
        type:'line',
        stack: '总量',
        data:[120, 132, 101, 134, 90, 230, 210]
      },
      {
        name:'鼎龙湾',
        type:'line',
        stack: '总量',
        data:[220, 182, 191, 234, 290, 330, 310]
      }
    ]
};
