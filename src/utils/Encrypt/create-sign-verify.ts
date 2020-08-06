/*
 * @description: 生成签名算法
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-12 09:52:44
 * @LastEditTime: 2020-06-15 19:11:49
 */
import { APP_SECRET } from '@config/index'
import MD5 from 'js-md5'

import Types from '../Types'

const isEmpty = (obj: any)=>{
  return (typeof obj === 'undefined'  || obj === '')
}
const transformToJson = (v: any) => {
  if (Types.isArrayFn(v) || Types.isPlainObj(v)) return JSON.stringify(v)
  return v
}

const createSignVefiry = (params: any = {}) => {
  const sortKeys = Object.keys(params).filter(k => (k || k !== 'sign') && !isEmpty(params[k])).sort()
  const transformdStr = sortKeys.reduce(
    (s1, s2) => s1 + transformToJson(params[s1]) + s2 + transformToJson(params[s2]),
    ''
    ).replace(/undefined/gi, '')
  return MD5(transformdStr + APP_SECRET)
}
export default createSignVefiry
