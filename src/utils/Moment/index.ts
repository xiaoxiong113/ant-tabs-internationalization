/*
 * @description: 格式化时间
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-29 10:15:39
 * @LastEditTime: 2020-05-29 10:15:39
 */ 

import moment from 'moment'

export default class Moment {
  /* date 格式转为 moment 格式，失败回退原始值 */
  static dateToMoment (date: any) {
    try {
      if (date) return moment(date)
      return date
    } catch (e) {
      return date
    }
  }

  /* moment 格式转为 date 格式，默认为 YYYY-MM-DD，失败回退原始值 */
  static momentToDate (momt: moment.Moment, format = 'YYYY-MM-DD') {
    try {
      if (momt) return moment(momt).format(format)
      return momt
    } catch (e) {
      return momt
    }
  }
}
