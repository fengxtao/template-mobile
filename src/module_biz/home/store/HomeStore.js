/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-02 10:45:16   
*/

import Home from '../model/Home';
import { action } from 'mobx';

class HomeStore {

    Home = null;
    init() {
        this.Home = new Home();
        return this;
    }
    @action 
    async loadPageSet() {
       const resp=  await this.Home.LoadPageSet();
       return resp;
    }

    async PwdSet(IsSelected,WagePwd,callback){
        const resp=  await this.Home.WagePwdSet(IsSelected,WagePwd);
        callback&&callback(resp);
    }
}

export default HomeStore;
