/*
 * @description: 路由集合
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-05-11 16:43:08
 * @LastEditTime: 2020-05-22 10:38:37
 */
// import { IRoute } from '@umijs/core'

// const files = require.context('.', true, /\.ts$/)
// const routes: IRoute[] = []

// files.keys().forEach((key: string) => {
//   if (key === './index.ts') return
//   routes.push(...files(key).default)
// })

// export default routes

import layouts from './layouts'

export default [...layouts ]
