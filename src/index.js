/*
 *  应用入口
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { setLoginParam, setAppMinVersion, setLogoPageInfo, registerLoginMiddleWare } from 'tplus-mobilelogin';
import { registerRoutes, registerStores, history } from 'tplusfx';
import routers from './routers';
import stores from './store';
// import BusLoginStore from './loginMiddleWare/store/LoginStore';
// import TemplateUtil from './util/templateUtil';
import './styles/index.less';
import App from 'tplusfx';
import { registerLogoutMiddleWare, registerBizError ,User} from 'tplus-api';
import { destroyApp } from 'tplus-mobile-plugin-gzq';
import { platform_chanjet, os_android } from './plugin/platform';
import {env} from 'tplusfx';
const {platform,constant} = env;
// import VConsole from 'vconsole/dist/vconsole.min.js';

// let vConsole  = new VConsole();


const appName = '智慧营销';
const appId = '31019';
const appDesc = '数据分析，智慧推广，赋能业务员，让营销更简单！';
const serviceDue = true;
const logoSrc = './image/welcome.png';

const indexPage = 'home';
const username = '17600382579';
const password = 'ysd123456';
const accountFilter = [''];

const iosVersion = '4.9.0';
const androidVersion = '4.9.2';

//注册登录中间件
// registerLoginMiddleWare('setSysInfo', BusLoginStore.setSysInfo);
// registerLoginMiddleWare('setSupplier', BusLoginStore.setSupplier);
// registerLoginMiddleWare('refreshTemplate', TemplateUtil.refreshTemplate);
//注册路由
registerRoutes(routers);
//注册store
registerStores(stores);
//注册登录信息
setLoginParam({ indexPage, username, password, accountFilter, serviceDue,appName ,appId});
//注册app版本控制
setAppMinVersion({ iosVersion, androidVersion });
//工作圈登录欢迎页信息
setLogoPageInfo({ appName, appDesc, logoSrc });
registerLogoutMiddleWare('ZYX_logout', () => {
    //如果是浏览器状态  增加下注销方法  如果在工作圈或友空间环境下  在tplus-api中处理
    if(platform == constant.platform.browser){
        setTimeout(()=>{
            destroyApp();
        },200);
    }
});
const amountCodeList = ['SysManage_MBAuthentication_01005'];
registerBizError(amountCodeList);
ReactDOM.render(<App />, document.getElementById('root'));


// document.body.className += 'bodyIphone';
// function isAllScreen() {
//     return screen.height / screen.width > 16 / 9;
// }

//     if (!os_android()) {
//         if (isAllScreen())
//             document.body.className += 'bodyIphoneX';
//         else
//             document.body.className += 'bodyIphone';
//     }

