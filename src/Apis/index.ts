/*
 * @description: 请求 apis 管理，接口管理地址： http://mcd-api.xinke86.com/swagger-ui.html
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 15:17:31
 * @LastEditTime: 2020-06-28 15:20:05
 */
import { TypesUtils } from '@/utils/index'

import APIS_TYPES from './interface/index'

const files = require.context('./sub-apis', true, /\.(ts|js)$/)
const APIS = {}

const handleFilePathToName = (pathName: string) => {
  const fileName = pathName.replace(/(\.\/|\.(ts|js))/g, '')
  return fileName.split('/').reduce((s1, s2) => `${s1.toUpperCase()}_${s2.toUpperCase()}`, 'API')
}

const handleError = (pathName: string) => {
  const content = files(pathName).default
  const type = TypesUtils.toRawType(content)
  if (type !== 'object') {
    console.error(`${files.resolve(pathName)}文件类型需默认导出为 object，当前类型为 ${type}，调整后再尝试!`)
    files(pathName).default = {}
    return false
  }
  return true
}

const parseDefaultAndSerialize = (pathName: string, fileName: string) => {
  const serializeContent: any = {}
  const content = files(pathName).default
  Object.keys(content).forEach(k => {
    serializeContent[`${fileName}_${k.toUpperCase()}`] = content[k]
  })
  return serializeContent
}

files.keys().forEach(key => {
  handleError(key)
  const fileName = handleFilePathToName(key)
  APIS[fileName] = parseDefaultAndSerialize(key, fileName)
})
console.log(APIS, 'APIS')
export default APIS as APIS_TYPES
