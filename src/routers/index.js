import React from 'react';
import Portal from '../module_biz/portal/page';
import { Redirect } from 'react-router';

import Home from '../module_biz/home/page';
 import CheckPwd from '../module_biz/checkPwd/page';
 import SetPwd from "../module_biz/setPwd/page";
 import SalaryList from "../module_biz/salaryList/page";
 import SalaryDetail from '../module_biz/salaryDetail/page';

export default [
  {
    path: '/',
    component: () => <Redirect to='/login' />,
    merge: false
  },
  {
    path: '/home',
    component: Home,
    routes:[]
  },
  {
    path: '/checkPwd',
    component: CheckPwd,
    routes:[]
  },
  {
    path: '/setPwd',
    component: SetPwd,
    routes:[]
  },
  {
    path: '/salaryList',
    component: SalaryList,
    routes:[]
  },
  {
    path: '/salaryDetail',
    component: SalaryDetail,
    routes:[]
  }
  
]
