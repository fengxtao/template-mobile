/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-09 18:39:18   
*/

import React, { Component } from "react";
import { Picker, Toast } from 'antd-mobile';
import { observer } from 'mobx-react';
import DateSearchItem from "./DateSearchItem";
import './DateSearch.less';
import tools from "../../../util/tools";


class DateSearch extends Component {

    constructor(props) {
        super(props);
    }

    getPickerData() {
        const { startYear, endYear } = this.props;
        let pickerData = [];
        let years = [];
        for (let i = startYear; i <= endYear; i++) {
            years.push({ label: i + '年', value: i });
        }

        let months = [];
        for (let i = 1; i <= 12; i++) {
            months.push({ label: i + '月', value: i });
        }

        pickerData.push(years);
        pickerData.push(months);
        pickerData.push(months);
        return pickerData;
    }

    render() {

        const { searchInfo } = this.props;
        return <div className='search'>
            <Picker
                data={this.getPickerData()}
                cascade={false}
                cols={3}
                onPickerChange={this.onPickerChange}
                onOk={this.onSearchChange}
                value={searchInfo.startYear ? [searchInfo.startYear, searchInfo.startMonth, searchInfo.endMonth] : null}>

                <DateSearchItem searchText={searchInfo.text}></DateSearchItem>
            </Picker>
            <div className='btnSearch' onClick={this.onSearch}>查询</div>
        </div>
    }

    onSearchChange = (value) => {
        if (value.length == 3) {
            if (value[1] > value[2])
                Toast.info('开始月份不能大于结束月份', 1)
            else
                this.props.search(value)
        }
    }

    onSearch = (e) => {
        tools.preventEvent();
        this.props.search(null)
    }


    onPickerChange(value) {
        console.log(value)
    }
}

export default DateSearch;