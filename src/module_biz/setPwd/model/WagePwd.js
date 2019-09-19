/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-02 10:29:52   
*/

import SetPwdApi from "../api/SetPwdApi";
import { observable, runInAction } from 'mobx';
import _ from 'lodash';

export default class WagePwd {

    constructor() {
    }

    async ModifyWagePwd(pwdOld,pwdNew) {
        const resp = await SetPwdApi.ModifyWagePwd(pwdOld,pwdNew);
        return resp;
    }
}