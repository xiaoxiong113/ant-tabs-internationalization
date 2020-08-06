import { REQUEST } from '@utils/index';
import APIS from '@/Apis'

const { API_LOGIN_INDEX_GETCAPTCHA, API_LOGIN_INDEX_LOGIN, API_LOGIN_INDEX_LIST } = APIS.API_LOGIN_INDEX


export async function getLogin(params: any) {
  return REQUEST.post(API_LOGIN_INDEX_LOGIN, params)
}


export async function getFakeCaptcha(mobile: string) {
  return REQUEST.get(`/api/login/captcha?mobile=${mobile}`);
}

// 获取权限列表
export async function apiAuthority(params: any) {
  return REQUEST.post(API_LOGIN_INDEX_LIST, params)
}

