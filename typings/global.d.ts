/*
 * @description: 全局范围变量类型定义文件
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-13 13:18:34
 * @LastEditTime: 2020-05-13 18:26:20
 */
declare namespace __MCD_TYPE {
  interface NodeProcess {
    env: {
      REQUEST_ROOT_API: string
      [key: string]: any
    }
  }
}

declare namespace NodeJS {
  interface Process extends __MCD_TYPE.NodeProcess {}
}

declare const process: NodeJS.Process
