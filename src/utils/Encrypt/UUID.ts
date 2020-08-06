/*
 * @description: 生成全局唯一标识符工具
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-04-29 13:49:49
 * @LastEditTime: 2020-05-17 11:05:51
 */
// 生成唯一标识符
const createUUID = () => {
  const s: any[] = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

// 缓存唯一标识符
const cacheUUID = () => {
  let uuid = ''
  const cacheFn = () => {
    uuid = uuid || createUUID()
    return uuid
  }
  if (uuid) return uuid
  return cacheFn()
}

export {
  createUUID,
  cacheUUID
}
