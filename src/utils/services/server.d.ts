/*
 * @description: 服务请求类型
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 15:16:27
 * @LastEditTime: 2020-07-31 13:38:27
 */
import { KeyValue } from 'typings/common'

import { AxiosInstance  } from 'axios'

export type Methods = 'post' | 'get'

export interface Instance extends AxiosInstance {
  get<R>(url: string, data?: any): Promise<Response<R>>
  post<R>(url: string, data?: any): Promise<Response<R>>
}

export interface Response<R> {
  code: number
  data: R
  message: string[]
  msg: string
  [key: string]: any
}

export interface RequestOptions {
  // 是否采用 mock 数据
  mock?: boolean
  // 是否显示本次请求 loading 效果
  isShowLoading?: boolean
  // 自定义 loading 文本
  tipsText?: string
  // 是否是上传功能请求，默认为 false，为 true 会修改 Content-Type 字段
  upload?: boolean
}

export interface RequestParams extends KeyValue {
  // 是否拦截本次请求，在业务中自行处理
  interceptor?: boolean
  isShowLoading?: boolean
  tipsText?: string
  // 本次请求的常规属性，用来区分该请求是登录还是非登录
  meta?: 'login' | 'common'
}
