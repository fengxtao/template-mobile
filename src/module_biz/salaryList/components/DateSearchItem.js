/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-09 18:39:18   
*/

import React, { Component } from "react";

import { observer } from 'mobx-react';

@observer
class DateSearchItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { searchText, onClick, extra } = this.props;

        return (
            <div onClick={onClick} className='inputSearch' >
                <span className='iconfont icon-search iconSearch'></span>
                <span className='searchText'>{searchText}</span>
                <span className='iconfont icon-riqi iconSearch'></span>
            </div>);
    }
}

export default DateSearchItem;