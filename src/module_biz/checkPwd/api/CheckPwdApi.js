import axios from 'axios';
import _ from 'lodash';
import { webapiProxyReq } from '../../../api/TplusApi';
import { CheckWagePwd } from '../../MockData';

export default class CheckPwdApi {

    static async CheckWagePwd(WagePwd) {
        const method = 'Ufida.T.WA.MBWeiXin.CheckWagePwd';
        const resp = await webapiProxyReq({ WagePwd: WagePwd }, method, true);
        return resp;
    }
}