/*
 * @description: 
 * @author: xiaoxiong
 * @lastEditors: xiaoxiong
 * @Date: 2020-06-28 14:29:26
 */ 
/*
 * @description: 
 * @author: xiaoxiong
 * @lastEditors: xiaoxiong
 * @Date: 2020-06-24 11:03:49
 */ 
import { REQUEST } from '@utils/index';
import APIS  from '@/Apis';
// 




export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

// export async function fakeAccountLogin(params: LoginParamsType) {
//   return REQUEST.post<{ status: string; type: number; currentAuthority: string}>(`/api/login/account`, params)
// }
const REQUEST_VESION = 'v2'


export async function apiGetPicture({ id }: any) { //获取电子围栏预览图
  return REQUEST.get(`/smartSite/device/${REQUEST_VESION}/getPicture?id=${id}`,{})
}