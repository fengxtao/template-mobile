/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-09 14:30:06   
*/

import React, { PropTypes, Component } from 'react';
import { observer, inject } from 'mobx-react';
import {Icon  } from 'antd-mobile';
import NavPage from '../../../routers/nav/NavPage';
import './index.less';
import SalaryDataItem from '../components/SalaryDataItem';




// @inject('SalaryDetailStore')
@observer
@NavPage
class SalaryDetail extends Component {


  constructor(props) {
    super(props);
    if(this.props.location.state){
      const { WageClassID } = this.props.location.state;
      this.WageClassID= WageClassID;
    }   
  }

  navLeftIcon() {
    return (<Icon type="left" />);
  }

  navTitle() {
    return '薪资查询';
  }

  componentDidMount() {
    stores.SalaryDetailStore.LoadData(this.WageClassID);
  }

  render() {
    const { SalaryDetailStore } = this.props;
    return (
      <div className='home'>
        {SalaryDetailStore.salaryDatas&&SalaryDetailStore.salaryDatas.length>0?<div >
          {SalaryDetailStore.salaryDatas.map(item=>{
            return <SalaryDataItem itemData={item}></SalaryDataItem>
          })}
          <div className='SalaryDetaildataBottom'></div>
        </div>:null}
      </div>
    );
  }
}

export default SalaryDetail;
