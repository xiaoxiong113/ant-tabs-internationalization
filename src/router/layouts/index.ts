/*
 * @description: layout 布局对应的路由配置
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-18 13:26:48
 * @LastEditTime: 2020-08-05 16:20:12
 */

import home from '../home';
import test1 from '../test1';
import test2 from '../test2';

// import base from '../base';
// import mcds from '../mcds-home';
// import AccountAuthority from '../pages/account-authority'
// import StaffManagement from '../pages/staff-management'

const routes = [ ...home, ...test1, ...test2 ];
export default [
  {
    path: '/',
    redirect: '/user/login',
  },
  {
    path: '/user',
    component: '@/layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/layouts',
    component: '@/layouts/SecurityLayout',
    routes: [
      {
        path: '/layouts',
        component: '@/layouts/BasicLayout',
        routes,
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
