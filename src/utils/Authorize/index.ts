/*
 * @description: 登录、权限认证等
 * @author: huxianghe
 * @Date: 2020-05-17 17:27:58
 * @lastEditors: huxianghe
 * @LastEditTime: 2020-06-11 09:59:01
 */
import { ComUtil } from '../ComUtil'

import MOMERY from '../Memo'

type Argu = string | string[]
type Result = boolean | boolean[]

export { default as AtomList } from './auth-atom'

export const hashasAuthority= <T extends Argu, R extends Result>(key: T): R => {
  if (typeof key === 'string') return ComUtil.inArray(key, MOMERY.memoInfo.AUTH).include
  const tempArr: boolean[] = []
  key.forEach(item => {
    tempArr.push(ComUtil.inArray(item, MOMERY.memoInfo.AUTH).include)
  })
  return tempArr
}
