/*
 * @description: 请求服务配置信息
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-04-30 15:31:57
 * @LastEditTime: 2020-07-22 15:56:12
 */
import { REQUEST_ROOT_API } from '../env'

// 请求的基础地址
export const BASE_URL = REQUEST_ROOT_API

// 请求的版本号
export const REQUEST_VERISION = 'v2'

// 平台标识符
export const PLATFORM = 'web'

export const TIMEOUT = 300000

// 请求的 MCOK 地址
// @ts-ignore
// export const MOCK_REQUEST_URL = ''

// 请求状态码
export const STATUS_CODE = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  LOGIN_OUT: 1001,
  ACCESS_LIMIT_REACHED: 1002
}

// 请求方法
export const REQUEST_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}
