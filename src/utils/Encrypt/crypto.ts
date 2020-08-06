/*
 * @description: crypto-js 加密工具
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 18:09:42
 * @LastEditTime: 2020-05-14 18:15:01
 */
import CryptoJS from 'crypto-js'

const key = 'hoYdxx*6A7HWrs4Mb}r9wPTm'
const iv = '0102030405060708'

/* ECB加密 */
const optionsECB = {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
}

/* CBC加密 */
const optionsCBC = {
  iv: CryptoJS.enc.Utf8.parse(iv),
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
}

export default class Crypto {

  /**
   * AES_CBC 加密
   * @param {*} text 加密的明文
   */
  static encryptCBC (text: string) {
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    const encryptedData = CryptoJS.AES.encrypt(text, keyHex, optionsCBC)
    return encryptedData.ciphertext.toString().toUpperCase()
  }

  /**
   * AES_CBC 解密
   * @param {*} text 需要解密
   */
  static decryptCBC (text:string) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(text)
    const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    const decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, keyHex, optionsCBC)
    return decryptedData.toString(CryptoJS.enc.Utf8)
  }

  /**
   * AES_ECB 加密
   * @param {*} text 加密的明文
   */
  static encryptECB (text:string) {
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    const encryptedData = CryptoJS.AES.encrypt(text, keyHex, optionsECB)
    return encryptedData.ciphertext.toString().toUpperCase()
  }

  /**
   * AES_ECB 解密
   * @param {*} text 需要解密
   */
  static decryptECB (text:string) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(text)
    const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    const decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, keyHex, optionsECB)
    return decryptedData.toString(CryptoJS.enc.Utf8)
  }
}
