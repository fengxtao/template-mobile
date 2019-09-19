import axios from 'axios';
import _ from 'lodash';
import { webapiProxyReq } from '../../../api/TplusApi';
import { CheckWagePwd } from '../../MockData';

export default class SetPwdApi {

    static async ModifyWagePwd(WagePwdOld,WagePwdNew) {
        // return new Promise((resolve, reject) => {
        //     resolve(CheckWagePwd);
        // });
        const method = 'Ufida.T.WA.MBWeiXin.ModifyWagePwd';
        const resp = await webapiProxyReq({WagePwdOld:WagePwdOld,WagePwdNew:WagePwdNew}, method, true);
        return resp;
    }
}