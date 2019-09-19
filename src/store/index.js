
import {observable, asFlat} from 'mobx';
// import LoginStore from '../login/store/LoginStore';
import HomeStore from '../module_biz/home/store/HomeStore';
import WagePwdStore from "../module_biz/checkPwd/store/WagePwdStore";
import SetPwdStore from "../module_biz/setPwd/store/SetPwdStore";
import SalaryListStore from "../module_biz/salaryList/store/SalaryListStore";
import SalaryDetailStore from '../module_biz/salaryDetail/store/SalaryDetailStore';
 
export default {
    // LoginStore : new LoginStore(),
    HomeStore: new HomeStore(),
    WagePwdStore:new WagePwdStore(),
    SetPwdStore:new SetPwdStore(),
    SalaryListStore:new SalaryListStore(),
    SalaryDetailStore:new SalaryDetailStore(),
};
