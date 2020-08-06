/*
 * @description: axios 拦截器设置
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 13:15:13
 * @LastEditTime: 2020-07-31 13:38:17
 */
import { PLATFORM, STATUS_CODE } from '@config/index'
import { MOMERY } from '@utils/index'

import createSignVefiry from '../Encrypt/create-sign-verify'

import { Instance } from './server'
import Request from './request'
import { KeyValue } from 'typings/common'

const {
  CLIENT_ERROR, SUCCESS, NOT_FOUND, BAD_GATEWAY, FORBIDDEN, AUTHENTICATE, SERVER_ERROR, GATEWAY_TIMEOUT,
  LOGIN_OUT, ACCESS_LIMIT_REACHED
} = STATUS_CODE

// const getDerivedResInfoFromStatusCode = (code: number) => {
//   switch (code) {
//     case SUCCESS: return { msg: '请求成功了!', code }
//     case CLIENT_ERROR: return { data: null, msg: '操作失败了!', code }
//     case AUTHENTICATE: return { data: null, msg: '参数出错了!', code }
//     case FORBIDDEN: return { data: null, msg: '没有权限访问!', code }
//     case NOT_FOUND: return { data: null, msg: '请求资源不存在!', code }
//     case SERVER_ERROR: return { data: null, msg: '服务端出错了!', code }
//     case BAD_GATEWAY: return { data: null, msg: '服务端请求响应超时了!', code }
//     case GATEWAY_TIMEOUT: return { data: null, msg: '服务端无响应!', code }
//     case LOGIN_OUT: return { data: null, msg: '登录失效，请重新登录!', code }
//     case ACCESS_LIMIT_REACHED: return { data: null, msg: '访问过于频繁，请稍后!', code }
//     default: return { data: null, msg: '阿噢，出现未知错误!', code }
//   }
// }

// TODO - 根据是否为上传请求修改 content-type 类型
const createInterceptors = (axiosIns: Instance, requestIns: Request, upload = false,  downLoad = false) => {
  const { mock } = requestIns
  // 添加请求拦截器
  axiosIns.interceptors.request.use
  (
    config => {
      const { method, data, params, headers } = config
      const timestamp = Math.round(new Date().getTime() / 1000)
      const transformdConfig: KeyValue = {
        headers: {
          ...headers,
          // timestamp,
          // 'Sec-Fetch-Mode': 'cors',
          // 'Sec-Fetch-Site': 'same-origin',
          // 'Connection': 'keep-alive',
          // 'Origin': 'http://test-stwebapi.xinke86.com/',
          // 'Host': 'http://test-stwebapi.xinke86.com/',
          Authorization: MOMERY.memoInfo.TOKEN,
          // platform: PLATFORM,
          'Content-Type': upload ? 'multipart/form-data' : downLoad ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : 'application/json;charset=UTF-8;'
        }
      }
      // transformdConfig.headers.sign = createSignVefiry(method === 'post' ? { ...data, timestamp } : { ...params, timestamp })
      
      return { ...config, ...transformdConfig }
    },
    error => Promise.reject(error)
  )
  // 添加响应拦截器
  axiosIns.interceptors.response.use
  (
    response => {
      const { data, headers: { authorization } } = response
      // const transformdData = getDerivedResInfoFromStatusCode(data.code)
      if (authorization) MOMERY.cachedToMemo('TOKEN', `${authorization}`)
      return response.data
      // return mock ? { data, ...transformdData } : { ...data, ...transformdData }
    },
    error => {
      if (error.response && error.response.status) {
        const { data } = error.response
        // const transformdData = getDerivedResInfoFromStatusCode(data.status)
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(mock ? { data } : { ...data })
      }
      return Promise.reject(error)
    }
  )
}

export default createInterceptors

