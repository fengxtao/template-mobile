/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-11 15:04:50   
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SalaryItem.less';
import DataTools from '../../componet/DataTools';

function SalaryItem({ itemData }, { push }) {

    return <div className='SalaryItem'>
        <div className='title' >
            <div className='titleInfo'>{itemData.WagePeriod + '  ' + itemData.WageClassName}</div>
            <div className='detail' onClick={e => push('salaryDetail', { WageClassID: itemData.WageID })}>
                <span>查看详情</span>
                <span className='iconfont icon-right-arrow icondetail'></span>
            </div>
        </div>
        <div className='data'>
            <div>
                {itemData.WageDetails.map((item, index) => {
                    if (index % 2 == 0)
                        return <div className='dataItem'>
                            <span className='WageName'>{item.WageName}</span>
                            <span className='WageValue'>{DataTools.getValue(item.WageValue, item.FieldType)}</span>
                        </div>
                })}
            </div>
            <div>
                {itemData.WageDetails.map((item, index) => {
                    if (index % 2 == 1)
                        return <div className='dataItem'>
                            <span className='WageName'>{item.WageName}</span>
                            <span className='WageValue'>{DataTools.getValue(item.WageValue, item.FieldType)}</span>
                        </div>
                })}
            </div>

        </div>
    </div>;
}
console.log('react',React)
SalaryItem.contextTypes = {
    pop: PropTypes.func,
    push: PropTypes.func,
    pushForResult: PropTypes.func,
    pageParam: PropTypes.func,
    popAndReturn: PropTypes.func,
    replace: PropTypes.func
}
export default SalaryItem;