import { reloadAuthorized } from './Authorized';
import { MOMERY } from '@utils/index'

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority (str?: string): string | string[] {
  // const authorityString =
  //   typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str;
  // // authorityString could be admin, "admin", ["admin"]
  // let authority;
  // try {
  //   if (authorityString) {
  //     authority = JSON.parse(authorityString);
  //   }
  // } catch (e) {
  //   authority = authorityString;
  // }
  // if (typeof authority === 'string') {
  //   return [authority];
  // }
  // // preview.pro.ant.design only do not use in your production.
  // // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  // if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  //   return ['admin'];
  // }
  return ["QX000100010000","QX000100020000","QX000100030000","QX000200010000","QX000300010000","QX000300020000","QX000400010000","QX000400020000","QX000500010000","QX000500020000","QX000600010000","QX000700010000"]
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  // auto reload
  reloadAuthorized();
}

// 判断权限有该权限则返回true否则false
export function isIncludeAuthority(id: number) {
  const authorityList = MOMERY.getCachedFromMemo('AUTHORITY_LIST')
  const arr = authorityList?.filter((v: any) => v.id === id)
  if (arr?.length) return true
  return false
}

