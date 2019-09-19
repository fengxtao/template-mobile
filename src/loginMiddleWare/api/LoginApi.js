import axios from 'axios';
import _ from 'lodash';
import { webapiProxyReq } from '../../api/TplusApi';
const QS = require('qs');

export default class LoginApi {

  static async getSysInfoForGZQ() {
    const method = 'chanjet.MB.TxBusCommon.GetSysInfoForGZQ';
    const resp = await webapiProxyReq({}, method, false);
    return resp;
  }

  static async getOrderFunction(param) {
    try {
      const method = 'chanjet.MB.MBPortal.GetPortalByAppid';
      const resp = await webapiProxyReq(param, method, false);
      return resp;
    } catch (error) {
      console.log(error);
      throw null;
      // return null;
    }

  }

  static async getAccountInfo(param) {
    const method = 'chanjet.SM.AccountOption.GetAccountInfo';
    const resp = await webapiProxyReq(param, method, false);
    return resp;
  }
}
