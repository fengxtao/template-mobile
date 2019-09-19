import React, {Component}  from 'react';
import {autobind} from 'core-decorators';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts'
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import echartsTheme from './config/macarons';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import _ from 'lodash';
var mobx = require('mobx');
class BaseEchart extends Component{

    static propTypes = {
        style: PropTypes.object,
        chartConfig: PropTypes.object,
        chartData: PropTypes.object
    };

    componentWillMount(){
     echarts.registerTheme('theme', echartsTheme);
   }

    componentWillUnmount(){
      if(this.echarts_react){
        let echarts_instance = this.echarts_react.instance;
        echarts_instance = null;
      }
    }

    componentDidMount(){
      if(this.echarts_react){
        let echarts_instance = this.echarts_react.instance;
        echarts_instance = null;
      }
    }

    render(){
      const {style,chartConfig,chartData} = this.props;
      let data = mobx.toJS(chartData);
      let chartConfigSeriesLength = chartConfig.series.length;
      //依照配置内容  过滤多余的数据项
      if(data.series){
        data.series = data.series.filter((item,index)=>{
            if(index<chartConfigSeriesLength){
                return true;
            }
            return false;
        });
      }

      let mergeOption = _.merge(chartConfig,data);
      console.log('mergeOption======',JSON.stringify(mergeOption));
      return(
        <ReactEcharts
           ref={(e) => { this.echarts_react = e; }}
           theme="theme"
           option={mergeOption}
           notMerge={true}
           lazyUpdate={true}
           style={style.echarts}/>
      );
    }
}

export default BaseEchart;
