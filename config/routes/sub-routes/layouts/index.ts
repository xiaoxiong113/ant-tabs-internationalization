/*
 * @description:
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-13 18:34:57
 * @LastEditTime: 2020-05-18 19:58:05
 */
import routes from '../../../../src/router'
export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  }
]
