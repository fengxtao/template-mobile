import echartUtils from '../../../util/echartUtil';
var echarts = require('echarts');


export const HorizontalProgressbarConfig = {

  title : {
    subtext: '金额(元)/日',
    subtextStyle: {
        color: '#666666',        // 主标题文字颜色
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: echartUtils.getDprValue(10),
    }
  },
  legend: {
     textStyle: {
         color: '#999999',
         fontStyle: 'normal',
         fontWeight: 'normal',
         fontFamily: 'sans-serif',
         fontSize: echartUtils.getDprValue(11),
     }
  },
  calculable : true,
  tooltip : {
    trigger: 'axis',
    textStyle: {
        fontSize: echartUtils.getDprValue(12)
    }
  },
  xAxis : [
      {
          type : 'category',
          data : [],
          nameGap: echartUtils.getDprValue(20),
          nameLocation: 'middle',
          nameTextStyle: {
              fontSize: echartUtils.getDprValue(9)
          },
          axisLabel: {
            textStyle: {
                fontSize: echartUtils.getDprValue(9)
              }
          }
    }
  ],
  yAxis : [
      {
          type : 'value',
          nameGap: echartUtils.getDprValue(20),
          nameLocation: 'middle',
          nameTextStyle: {
              fontSize: echartUtils.getDprValue(9)
          },
          axisLabel: {
            textStyle: {
                fontSize: echartUtils.getDprValue(9)
              }
          }
      }
  ],
  series : [
      {
          name:'蒸发量',
          type:'bar',
          data:[]

      },
      {
          name:'降水量',
          type:'bar',
          data:[]

      }
  ]
};
