/*
 * @description: 通用工具
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2019-04-05 14:05:14
 * @LastEditTime: 2020-05-17 11:26:01
 * @copyright: Copyright © 2019 Shanghai Yejia Digital Technology Co., Ltd. All rights reserved.
 */
export class ComUtil {
  /**
   * 判断目标元素是否存在指定数组中
   * @param ele 目标元素
   * @param array 目标数组
   */
  static inArray (ele: string | number, array: (string|number)[]) {
    const i = array.indexOf(ele)
    return {
      include: i !== -1,
      index: i
    }
  }

  /**
   * 自定义字符串长度
   * @param str 待处理字符串
   * @param defaultLen 默认限制长度
   */
  static sliceStr (str: string, defaultLen = 19) {
    if (str) {
      if (str.length > defaultLen) {
        str = `${str.substr(0, defaultLen)}...`
      }
    }
    return str
  }

  /* 深度对比两个对象是否相同 */
  static compareDeep (origin: any, target: any) {
    let p
    if (typeof origin === 'number' && typeof target === 'number' && Number.isNaN(origin) && Number.isNaN(target)) {
      return true
    }
    if (origin === target) {
      return true
    }
    if (typeof origin === 'function' && typeof target === 'function') {
      if ((origin instanceof RegExp && target instanceof RegExp) ||
      (origin instanceof String || target instanceof String) ||
      (origin instanceof Number || target instanceof Number)) {
        return origin.toString() === target.toString()
      }
      return false
    }
    if (origin instanceof Date && target instanceof Date) {
      return origin.getTime() === target.getTime()
    }
    if (!(origin instanceof Object && target instanceof Object)) {
      return false
    }
    if (origin.prototype !== target.prototype) {
      return false
    }
    if (origin.constructor !== target.constructor) {
      return false
    }
    for (p in target) {
      if (!origin.hasOwnProperty(p)) {
        return false
      }
    }
    for (p in origin) {
      if (!target.hasOwnProperty(p)) {
        return false
      }
      if (typeof target[p] !== typeof origin[p]) {
        return false
      }
      if (!ComUtil.compareDeep(origin[p], target[p])) {
        return false
      }
    }
    return true
  }
}

/* 格式化 input 表单框数据 */
export class FormatInputValue {
  static intLen: number = 8

  static decimalsLen: number = 2

  /* 去除空格 */
  static removeEmpty = (val:any) => {
    return val.replace(/(^\s*)|(\s*$)/g, '')
  }

  /* 只允许输入整数 */
  static parsetInt (v: string, intLen = FormatInputValue.intLen) {
    return v.substr(0, intLen).replace(/[^\d]/g, '')
  }

  /* 只允许输入整数且支持可以保留负号 */
  static parsetIntAndKeepMinus (v: string, intLen = FormatInputValue.intLen) {
    v = v
      .replace(/[^\d-]/g, '')
      .replace(/-{1,}/g, '-')
      .replace(/^-/, '$#$')
      .replace(/-/g, '')
      .replace('$#$', '-')
    if (v.indexOf('-') > -1) intLen += 1
    return v.substr(0, intLen)
  }

  /* 保留两位小数点，处理简单数字的转化，不处理表单数据格式化 */
  static toFixedDecimal (v: string | number, decimalsLen = FormatInputValue.decimalsLen) {
    if (!v) return '0.00'
    return parseFloat(`${v}`).toFixed(decimalsLen)
  }

  /**
   * 保留小数点，默认保留两位
   * @param v 待处理字符串
   * @param decimalsLen 小数点位数
   * @param intLen 整数位数
   */
  static toFixed (v: string, decimalsLen = FormatInputValue.decimalsLen, intLen = FormatInputValue.intLen) {
    v = v
      .substr(0, intLen + decimalsLen + 1)
      .replace(/[^\d.]/g, '')
      .replace(/^\./, '')
      .replace(/\.{2,}/g, '.')
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
      .replace(new RegExp(`^(\\d+)\\.(\\d{0,${decimalsLen}}).*$`), '$1.$2')
      .replace(/^\d+/, (match: string) => match.substr(0, intLen))
    return v
  }

  /* 保留小数点和负号，小数点默认保留两位 */
  static toFixedAndKeepMinus (v: string, decimalsLen = FormatInputValue.decimalsLen, intLen = FormatInputValue.intLen) {
    v = v
      .replace(/[^\d.-]/g, '')
      .replace(/^\./, '')
      .replace(/\.{2,}/g, '.')
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
      .replace(/-{1,}/g, '-')
      .replace(/^-/, '$#$')
      .replace(/-/g, '')
      .replace('$#$', '-')
      .replace(new RegExp(`^(-?\\d+)\\.(\\d{0,${decimalsLen}}).*$`), '$1.$2')
    if (v.indexOf('-') > -1) intLen += 1
    v = v
      .replace(/^-?\d+/, (match: string) => match.substr(0, intLen))
    return v.substr(0, intLen + decimalsLen + 1)
  }

  /**
   * 千分位数字
   * @param v 数字
   * @param decimalsLen 保留的小数点
   */
  static formatMoney (v: string, decimalsLen = FormatInputValue.decimalsLen) {
    if (!v) return v
    v = parseFloat(v.replace(/[^\d.-]/g, '')).toFixed(decimalsLen)
    const [int, decimal] = v.split('.')
    const reverseInt = int.split('').reverse()
    let t = ''
    for (let i = 0, len = reverseInt.length; i < len; i += 1) {
      t += reverseInt[i] + ((i + 1) % 3 === 0 && (i + 1) !== len ? ',' : '')
    }
    if (decimal) return `${t.split('').reverse().join('')}.${decimal}`
    return t.split('').reverse().join('')
  }
}
