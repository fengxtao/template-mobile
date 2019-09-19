/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-09 14:30:06   
*/

import React, { PropTypes, Component } from 'react';
import { autobind } from 'core-decorators';
import { observer, inject } from 'mobx-react';
import { Icon, Toast } from 'antd-mobile';
import NavPage from '../../../routers/nav/NavPage';
import { destroyApp } from 'tplus-mobile-plugin-gzq';
import './index.less';
import DateSearch from "../components/DateSearch";
import SalaryCount from '../components/SalaryCount';
import SalaryItem from '../components/SalaryItem';



// @inject('SalaryListStore')
@observer
@NavPage
class SalaryList extends Component {


  constructor(props) {
    super(props);
    //stores.SalaryListStore.init();
    const date = new Date();
    this.startYear = date.getFullYear();
    this.endYear = date.getFullYear();

    if (this.props.location.state) {
      const { CanStartYaer, CanEndYaer } = this.props.location.state;
      this.startYear = parseInt(CanStartYaer);
      this.endYear = parseInt(CanEndYaer);
    }
  }

  navLeftIcon() {
    return (<Icon type="left" />);
  }

  navTitle() {
    return '薪资查询';
  }

  componentDidMount() {

  }

  render() {
    const { SalaryListStore } = this.props;
    return (
      <div className='home'>
        {SalaryListStore.searchText}
        <DateSearch
          searchInfo={SalaryListStore.searchInfo}
          startYear={this.startYear}
          endYear={this.endYear}
          search={this.search}></DateSearch>
        <div className='homeData'>
          {SalaryListStore.salaryList && SalaryListStore.salaryList.length > 0 ?
            <div>
              <SalaryCount countInfo={SalaryListStore.salaryCount} searchText={SalaryListStore.searchInfo.text}></SalaryCount>
              {SalaryListStore.salaryList.map(item => {
                return <SalaryItem itemData={item} ></SalaryItem>
              })}
              <div className='dataBottom'></div>
            </div> : SalaryListStore.searchInfo.text == '' ?
              <div className='searchMonth'>
                <div className='iconfont icon-liebiaowushuju1 dataEmpty iconMonth'></div>
                <div className='monthText'>请选择要查的工资月份</div>
              </div> : null
          }
        </div>
      </div>
    );
  }

  search = (val) => {
    const { SalaryListStore } = this.props;
    const emptyCallBack=()=>{
      Toast.info('暂无工资数据',2)
    };

    SalaryListStore.search(val,emptyCallBack);
  }

}

export default SalaryList;
