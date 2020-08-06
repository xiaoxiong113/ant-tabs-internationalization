/*
 * @description: 首页接口
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-06-03 16:44:37
 * @LastEditTime: 2020-06-03 16:44:38
 */
declare const APIS: [
  'API_HOME_INDEX_LIST'
]

type API_HOME = {
  [api in (typeof APIS)[number]]: string
}

export interface API_HOME_INDEX {
  API_HOME_INDEX: API_HOME
}
