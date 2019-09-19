/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-02 10:29:52   
*/

import HomeApi from "../api/HomeApi";
import { observable, runInAction } from 'mobx';
import _ from 'lodash';

export default class Home {

    @observable PageSet = {};
    @observable PwdSet = {}

    constructor() {
        this.PageSet = {};
    }

    async LoadPageSet() {
        const set = await HomeApi.GetWXShowPageType();
        runInAction('refresh', () => {
            this.PageSet = set;
        });
    }

    async WagePwdSet(IsSelected, WagePwd) {
        const resp = await HomeApi.SetWageQueryConfig(IsSelected, WagePwd);
        return resp;
    }

}