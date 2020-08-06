/*
 * @description: 
 * @author: xiaoxiong
 * @lastEditors: xiaoxiong
 * @Date: 2020-06-24 11:03:49
 */ 
import { REQUEST } from '@utils/index';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return REQUEST.post<{ status: string; type: number; currentAuthority: string}>(`/api/login/account`, params)
}

let baseUrl = 'http://test-stwebapi.xinke86.com/'
export async function getLeftMenu(params: {}) {
  return REQUEST.post(`${baseUrl}/smartSite/project/v2/leftMenu`,params);
}
