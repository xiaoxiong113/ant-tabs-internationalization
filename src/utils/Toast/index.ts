/*
 * @description: 基于 message 组件封装的提示，在限定的 duration 范围内只会出现一次
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-15 16:26:00
 * @LastEditTime: 2020-05-22 16:10:51
 */
import { message } from 'antd'

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading'

export default class Toast {
  static isShowMes = false

  static duration = 3

  static toast (title: string, type: NoticeType = 'success') {
    if (Toast.isShowMes) return
    Toast.isShowMes = true
    message[type](title, Toast.duration).then(() => { Toast.isShowMes = false }, () => {})
  }
}
