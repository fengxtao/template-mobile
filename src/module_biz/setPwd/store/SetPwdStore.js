/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-02 10:45:16   
*/

import WagePwd from '../model/WagePwd';
import { action } from 'mobx';

class SetPwdStore {

    WagePwd = null;
    init() {
        this.WagePwd = new WagePwd();
        return this;
    }
    
    async ModifyWagePwd(pwdOld,pwdNew,callback){
        const resp=  await this.WagePwd.ModifyWagePwd(pwdOld,pwdNew);
        callback&&callback(resp);
    }
}

export default SetPwdStore;
