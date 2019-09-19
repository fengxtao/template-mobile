/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-02 10:45:16   
*/

import SalaryListApi from "../api/SalaryListApi";
import { observable, action, runInAction } from 'mobx';
import _ from 'lodash';

class SalaryListStore {

    @observable salaryList = [];
    @observable salaryCount = {};
    @observable searchInfo = { text: '', startYear: null, startMonth: null, endMonth: null };

    @action
    async search(val, emptyCallBack) {

        if (val != null && val.length == 3) {
            this.searchInfo.startYear = val[0];
            this.searchInfo.startMonth = val[1];
            this.searchInfo.endMonth = val[2];
            this.searchInfo.text = val[0] + '年' + val[1] + '月-' + val[2] + '月';
        }

        if (this.searchInfo.startYear) {
            const resp = await SalaryListApi.QueryWageAbstract(this.searchInfo.startYear + '-' + this.searchInfo.startMonth, this.searchInfo.startYear + '-' + this.searchInfo.endMonth);
            const listDatas = resp.Data.Detail;
            if (listDatas.length > 0) {
                this.salaryCount = listDatas.filter(item => item.IsTotal == true)[0];
                const data = listDatas.filter(item => item.IsTotal == false).sort((a, b) => a.WagePeriod > b.WagePeriod);
                this.salaryList = data;
            }
            else{
                this.salaryCount={};
                this.salaryList=[];
                emptyCallBack && emptyCallBack();
            }
                
        }
    }
}

export default SalaryListStore;