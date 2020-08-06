/*
 * @description: 登录所有 apis 类型定义
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 16:54:01
 * @LastEditTime: 2020-07-15 18:26:06
 */
declare const APIS: [
  'API_LOGIN_INDEX_GETCAPTCHA', 
  'API_LOGIN_INDEX_LOGIN', 
  'API_LOGIN_INDEX_OUT',
  'API_LOGIN_INDEX_LIST'
]

type APIS_LOGIN = {
  [api in (typeof APIS)[number]]: string
}

export interface API_LOGIN_INDEX {
  API_LOGIN_INDEX: APIS_LOGIN
}
