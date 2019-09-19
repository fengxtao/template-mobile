import axios from 'axios';
import _ from 'lodash';
import { webapiProxyReq } from '../../../api/TplusApi';

export default class SalaryDetailApi {

    static async QueryWageDetail(WageClassID) {
        const method = 'Ufida.T.WA.MBWeiXin.QueryWageDetail';
        const resp = await webapiProxyReq({ WageClassID: WageClassID }, method, true);
        return resp;
    }
}