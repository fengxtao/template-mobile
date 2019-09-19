/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-02 10:45:16   
*/

import SalaryDetailApi from "../api/SalaryDetailApi";
import { observable, action } from 'mobx';
import _ from 'lodash';

class SalaryDetailStore {

    @observable salaryDatas = [];

    @action
    async LoadData(WageClassID) {
        const resp = await SalaryDetailApi.QueryWageDetail(WageClassID);
        if (resp.Data.Detail && resp.Data.Detail[0].WageDetails)
            this.salaryDatas = resp.Data.Detail[0].WageDetails;
    }
}

export default SalaryDetailStore;