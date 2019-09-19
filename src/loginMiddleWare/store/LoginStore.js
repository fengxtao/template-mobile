import SysInfo from '../model/SysInfo';
import SupplierInfo from "../../module_biz/promotion/const/model/SupplierInfo";
import tools from '../../util/tools';

class LoginStore{

  static async setSysInfo(){
    await SysInfo.setSysInfo();
    await SysInfo.setOrderFunction();
  }

  static async setSupplier(){
    // 启用订货商城后 获取商城信息
    const isOpenMall = tools.getCacheValue('B2BMall')=='1'?true:false;
    const sysinfo = SysInfo.getSysInfo();
    const IsSalesmanContinue = sysinfo.PersonInfo.IsSalesman;
    if(isOpenMall&&IsSalesmanContinue){
      SupplierInfo.setSupplier();
    }else{
      tools.removeCacheValue('SupplierInfo');
    }
  }
}

export default LoginStore;
