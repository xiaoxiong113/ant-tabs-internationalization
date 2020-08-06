/*
 * @description: 
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-15 11:14:31
 * @LastEditTime: 2020-06-03 19:54:41
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { LocationDescriptorObject } from 'history-with-query'

import { IRouteComponentProps } from 'umi/types'

import { Dispatch } from 'umi'

export { ConnectState } from '@/models/connect'

export interface KeyValue {
  [key: string]: any
}

export interface BaseProps extends IRouteComponentProps, KeyValue {
  location: LocationDescriptorObject
  dispatch: Dispatch
  isChinaFund: boolean
  userInfo: KeyValue
}
