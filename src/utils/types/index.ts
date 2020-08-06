/*
 * @description: 
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 16:21:37
 * @LastEditTime: 2020-06-15 19:11:09
 */
export default class JudgeUtil {
  /*  获取原始类型 */
  static toRawType (v: any) {
    return Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
  }

  /**
   * 判断是否是数字
   * @param obj 需要判断的值
   */
  static isNumber (v: any) {
    return JudgeUtil.toRawType(v) === 'number'
  }

  /** 判读是否是数组 */
  static isArrayFn (v: any) {
    return JudgeUtil.toRawType(v) === 'array'
  }

  /* 判断是否为纯对象 */
  static isPlainObj (obj: any) {
    return JudgeUtil.toRawType(obj) === 'object'
  }

  /**
   * 判读是否为空
   */
  static isEmpty (obj: any) {
    return (typeof obj === 'undefined' || obj === null || obj === '')
  }
}
