/*
 * @description: storage 工具类
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 18:15:34
 * @LastEditTime: 2020-06-08 11:44:50
 */
import Crypto from '../Encrypt/crypto'
import { IS_DEV } from '@config/index'

const { encryptECB, decryptECB } = Crypto

export default class Storage {
  /**
   * 获取对应的文件信息  sessionStorage
   * @param name  对应保存信息的名称
   */
  static getSessionStorage (name: string) {
    const info = sessionStorage.getItem(!IS_DEV ? encryptECB(name) : name)
    if (typeof info !== 'undefined' && info !== null) return JSON.parse(!IS_DEV ? decryptECB(info) : info)
    return null
  }

  /**
   * 设置保存信息  sessionStorage
   * @param name  保存的姓名
   * @param obj   需要存储的对象
   */
  static setSessionStorage (name: string, obj: any) {
    if (!obj) return
    let info = JSON.stringify(obj)
    let key = name
    if (!IS_DEV) {
      info = encryptECB(info)
      key = encryptECB(key)
    }
    sessionStorage.setItem(key, info)
  }

  static clearSession (name: string) {
    sessionStorage.removeItem(!IS_DEV ? encryptECB(name) : name)
  }

  /**
   * 获取对应的文件信息  localStorage
   * @param name  对应保存信息的名称
   */
  static getLocalStorage (name:string) {
    const info = localStorage.getItem(!IS_DEV ? encryptECB(name) : name)
    if (typeof info !== 'undefined' && info !== null) return JSON.parse(!IS_DEV ? decryptECB(info) : info)
    return null
  }

  /**
   * 设置保存信息   localStorage
   * @param name  保存的姓名
   * @param obj   需要存储的对象
   */
  static setLocalStorage (name:string, obj:any) {
    if (!obj) return
    let info = JSON.stringify(obj)
    let key = name
    if (!IS_DEV) {
      info = encryptECB(info)
      key = encryptECB(key)
    }
    localStorage.setItem(key, info)
  }

  static clearLocalStorage (name:string) {
    localStorage.removeItem(!IS_DEV ? encryptECB(name) : name)
  }
}
