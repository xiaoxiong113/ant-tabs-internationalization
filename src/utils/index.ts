/*
 * @description: songliubiao
 * @author: songliubiao, huxianghe
 * @lastEditors: songliubiao
 * @Date: 2020-05-13 15:14:07
 * @LastEditTime: 2020-06-22 16:10:11
 */
import config from '@/apiorzConfig/orz'

export { AtomList, hashasAuthority } from './Authorize'

export { default as createSignVefiry } from './Encrypt/create-sign-verify'

export { default as encryptByRSA } from './Encrypt/encrypt-by-rsa'

export { createUUID, cacheUUID } from './Encrypt/UUID'

export { default as Crypto } from './Encrypt/crypto'

export { default as TypesUtils } from './Types'

export { default as HttpUtil } from './Http'

export { FormatInputValue, ComUtil } from './ComUtil'

export { default as Storage } from './Storage'

export { TOKEN, UUID, AUTH, INITIAL_LIST } from './Storage/config'

export { default as Toast } from './Toast'

export { default as MOMERY } from './Memo'

export { default as Moment } from './Moment'

export {
  axiosIns as axios,
  default as CreateRequest,
  get as $GET,
  post as $POST,
  request as REQUEST
} from './Services/request'


//orz
export function format(str, obj) {
  if(!obj) {
      return str
  }
  return str.replace(/\{([^}]+)\}/g, (match, key) => obj[key])
}


export function getStorage() {
  if(window.localStorage) {
      return window.localStorage
  }
  return {}
}

export function getTokenForStorage() {
  const storage = getStorage()
  if(storage) {
      return storage.getItem(config.accessTokenKey)
  }else {
      return false
  }
}

export function setTokenForStorage(token) {
  const storage = getStorage()
  if(storage) {
      return storage.setItem(config.accessTokenKey, token)
  }else {
      return false
  }
}

export function removeTokenForStorage() {
  const storage = getStorage()
  if(storage) {
      return storage.removeItem(config.accessTokenKey)
  }else {
      return false
  }
}


export function treeForEach(treeData, cb, parent) {
  treeData.forEach((data) => {
      cb(data, parent)
      if(data.children) {
          treeForEach(data.children, cb, data)
      }
  })
}

export function hasTokenForStorage() {
  const token = getTokenForStorage()

  return !!token
}