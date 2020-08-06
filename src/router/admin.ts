/*
 * @description: admin路由
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-05-09 14:14:18
 * @LastEditTime: 2020-05-18 13:52:52
 */
export default [
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    component: './Admin',
    authority: ['admin'],
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Home',
        authority: ['admin'],
      },
    ],
  },
];
