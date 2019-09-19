import React from 'react';
import Portal from '../module_biz/portal/page';
import { Redirect } from 'react-router';

export default [
  {
    path: '/',
    component: () => <Redirect to='/login' />,
    merge: false
  },
  {
    path: '/portal',
    component: Portal,
    routes:[]
  }
  
]
