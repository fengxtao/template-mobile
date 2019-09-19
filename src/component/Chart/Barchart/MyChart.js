import React, {Component}  from 'react';
import BaseEchart from '../BaseEchart';
import tools from '../../../util/tools';
import PropTypes from 'prop-types';
import _ from 'lodash';
class MyChart extends Component{

  static propTypes = {
      chartData: PropTypes.object,
      chartConfig:PropTypes.string,
      chartStyle: PropTypes.object
  };



  render(){
    const {chartData = {},chartConfig,chartStyle = {
      echarts: {
        width:'100%',
        height: parseInt(window.innerHeight/2)+ 'px'
      }
    }} = this.props;
    let uiConfig = require('../config/'+chartConfig);
    uiConfig = uiConfig[chartConfig];
    let cloneUIConfig = _.cloneDeep(uiConfig);

    //特殊判断  如果是饼状图  静负数数据从series和legend中移除
    if(chartData.series && chartData.series.length>0)
    {
      if(cloneUIConfig.series[0].type == 'pie'){
        chartData.series[0].data.forEach((item,index)=>{
          // if(index == 0){
          //   item.selected = true;
          // }
          if(item.name==''){
            item.name = '空' ;
          }
          if(item.value<0){
            item.value = 0;
            chartData.legend.data[index] = undefined;
          }
          if(item.value){
            item.value = tools.fixedNum(item.value,2);
          }
        });
      }
    }

    if(chartData.legend && chartData.legend.data){
      for(let i=0;i<chartData.legend.data.length;i++){
        let value = chartData.legend.data[i];
        if(value == ''){
          chartData.legend.data[i] = '空';
        }
      }
    }
    return (
      <BaseEchart chartData={chartData} onClick={this.props.onClick} style={chartStyle} chartConfig={cloneUIConfig}/>
    )

  }

}
export default MyChart;
