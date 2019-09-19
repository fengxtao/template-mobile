/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-02 10:45:16   
*/

import WagePwd from '../model/WagePwd';
import { action } from 'mobx';

class WagePwdStore {

    WagePwd = null;
    init() {
        this.WagePwd = new WagePwd();
        return this;
    }
    
    async CheckWagePwd(wagePwd,callback){
        const resp=  await this.WagePwd.checkPwdSet(wagePwd);
        callback&&callback(resp);
    }
}

export default WagePwdStore;
