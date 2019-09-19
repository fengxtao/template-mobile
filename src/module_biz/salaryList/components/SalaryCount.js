/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-11 15:04:50   
*/

import React, { Component } from 'react';
import './SalaryCount.less';
import DataTools from '../../componet/DataTools';

function SalaryCount({ countInfo, searchText }) {

    return <div className='SalaryCount'>
        <div className='title' >{searchText + ' ' + countInfo.WageClassName}</div>
        <div className='countData'>
            <div>
                {countInfo.WageDetails&&countInfo.WageDetails.map((item, index) => {
                    if (index % 2 == 0)
                        return <div className='dataItem'>
                            <div className='WageValue'>{DataTools.getValue(item.WageValue, item.FieldType)}</div>
                            <div className='WageName'>{item.WageName}</div>
                        </div>
                })}
            </div>
            <div>
                {countInfo.WageDetails&&countInfo.WageDetails.map((item, index) => {
                    if (index % 2 == 1)
                        return <div className='dataItem'>
                            <div className='WageValue'>{DataTools.getValue(item.WageValue, item.FieldType)}</div>
                            <div className='WageName'>{item.WageName}</div>
                        </div>
                })}
            </div>

        </div>
    </div>;
}

export default SalaryCount;