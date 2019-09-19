import {
  observable,
  transaction,
  map,
  computed,
  when,
  reaction,
  runInAction,
  action
} from 'mobx';
import tools from '../../util/tools';
import LoginApi from '../api/LoginApi';

const accountInfos = ['AIMarketing_SaleDataVoucherType','AIMarketing_IncludeNoAudited','B2BMall'];
export default class SysInfo {

  static async setSysInfo(){
    const sysInfo = await LoginApi.getSysInfoForGZQ();
    accountInfos.forEach(async item=>{
      const accountInfo = await LoginApi.getAccountInfo({"code":item});
      if(accountInfo.Value){
          tools.setCacheValue(item,accountInfo.Value);
      }
    });
    tools.setCacheValue('SysInfo',sysInfo);
  }

  //设置T+下单相关的权限信息
  static async setOrderFunction(){
    try{
      let resp = await LoginApi.getOrderFunction({'appid':'1155'});
      if(resp.Funcs){
          tools.setCacheValue('orderFuncs',resp.Funcs);
      }
    }catch(err){
      tools.setCacheValue('orderFuncs','');
    }

  }

  //从缓存中恢复Channel对象
  static getSysInfo(){
    let SysInfoCache = tools.getCacheValue('SysInfo');
    if(!tools.isNull(SysInfoCache)){
      return JSON.parse(SysInfoCache);
    }
    return undefined;
  }

  //获取T+下单相关的权限信息
  static getOrderFunction(){
    let funcs = tools.getCacheValue('orderFuncs');
    if(!tools.isNull(funcs)){
        return funcs.split(',');;
    }
    return undefined;
  }

}
