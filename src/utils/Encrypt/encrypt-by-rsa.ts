/*
 * @description: rsa 加密
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-29 13:27:45
 * @LastEditTime: 2020-05-29 13:34:14
 */ 
import JSEncrypt from 'jsencrypt'

import { RSA_PUBLIC_KEY } from '@config/index'

const encrypt = new JSEncrypt()

encrypt.setPublicKey(RSA_PUBLIC_KEY)

export default (v: string) => encrypt.encrypt(v)
