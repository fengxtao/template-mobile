import axios from 'axios';
import _ from 'lodash';
import { webapiProxyReq } from '../../../api/TplusApi';
import { GetWXShowPageType, SetWageQueryConfig } from '../../MockData';

export default class HomeApi {

    static async GetWXShowPageType() {
        const method = 'Ufida.T.WA.MBWeiXin.GetWXShowPageType';
        const resp = await webapiProxyReq(null, method, true);
        return resp;
        // return GetWXShowPageType;       
        // return new Promise((resolve, reject) => {
        //     resolve(GetWXShowPageType);
        // });
    }
    static async SetWageQueryConfig(IsSelected, WagePwd) {
        const method = 'Ufida.T.WA.MBWeiXin.SetWageQueryConfig';
        const resp = await webapiProxyReq({IsSelected:IsSelected,WagePwd:WagePwd}, method, true);
        return resp;

        // return new Promise((resolve, reject) => {
        //     resolve(SetWageQueryConfig);
        // });
    }
}