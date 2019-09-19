/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-02 10:29:52   
*/

import CheckPwdApi from "../api/CheckPwdApi";
import { observable, runInAction } from 'mobx';
import _ from 'lodash';

export default class WagePwd {

    constructor() {
    }

    async checkPwdSet(pwd) {
        const resp = await CheckPwdApi.CheckWagePwd(pwd);
        return resp;
    }
}