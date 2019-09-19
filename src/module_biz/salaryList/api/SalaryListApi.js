import axios from 'axios';
import _ from 'lodash';
import { webapiProxyReq } from '../../../api/TplusApi';
import { QueryWageAbstract } from '../../MockData';

export default class SalaryListApi {


    static async QueryWageAbstract(startDate,endDate){
        const method = 'Ufida.T.WA.MBWeiXin.QueryWageAbstract';
        const resp = await webapiProxyReq({StartDate:startDate,EndDate:endDate}, method, true);
        return resp
        // const method = 'Ufida.T.WA.MBWeiXin.QueryWageDetail';
        // const resp = await webapiProxyReq({WageClassID:'1',StartDate:startDate,EndDate:endDate}, method, true);
        // return resp
    }
}