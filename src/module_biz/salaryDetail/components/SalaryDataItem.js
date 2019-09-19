/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-11 15:04:50   
*/

import React, { Component } from 'react';
import './SalaryDataItem.less';
import DataTools from '../../componet/DataTools';

function SalaryDataItem({ itemData }) {

    return <div className='SalaryDataItem'>
        <div className='itemName'>{itemData.WageName}</div>
        <div className='itemValue'>{DataTools.getValue(itemData.WageValue,itemData.FieldType)  }</div>
    </div>;
}

export default SalaryDataItem;