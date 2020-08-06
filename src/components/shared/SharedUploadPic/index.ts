/*
 * @description: 上传图片的业务组件
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-26 10:12:29
 * @LastEditTime: 2020-07-31 13:38:44
 */
import { CreateRequest } from '@utils/index'

import APIS from '@/Apis'

import { PicItem } from '../../upload/FilesUpload'

const uploadIns = new CreateRequest({ upload: true })

const { API_COMMON_INDEX_UPLOADPIC } = APIS.API_COMMON_INDEX



/**
 * @description: 将本地上传的图片列表传给后台，生成一个含有 oss 短 key 和 长 key 对象的数组
 * @param {picList} 本地上传的图片列表
 * @param {module} 后台约定的用于在 oss 上面存储的路径，叔叔之家默认该值为 1，志愿者为 2
 * @return: Array<OssUrlProps>
 */
const SharedUploadPic = async (picList: PicItem[]): Promise<any> => {
  const len = picList.length
  if (!len) return []
  const formData = new FormData()
  let ossShortUrl: any = []
  let isModified = false
  // 修改次数
  let modifiedTimes = 0
  for (const item of picList.filter(i => i)) {
    const { shortUrl, file, url } = item
    if (file) {
      formData.append('file', item.file!, item.file!.name)
      // @ts-ignore
      ossShortUrl.push(undefined)
      isModified = true
      modifiedTimes += 1
    } else {
      ossShortUrl.push({ relativePath: shortUrl!, fileUrl: url })
    }
  }
  // 未做任何修改，返回原始短路径
  if (!isModified) return ossShortUrl
  const data  = await uploadIns.axiosIns({
    method: 'post',
    url: API_COMMON_INDEX_UPLOADPIC,
    data: formData,
  })
  // 全修改，直接返回修改后所有短路径
  if (modifiedTimes === len) {
    ossShortUrl = data
  } else {
    (data || []).forEach(item1 => {
      ossShortUrl.some((item2: any, i: any, arr: any) => {
        if (!item2) {
          arr.splice(i, 1, item1)
          return true
        }
        return false
      })
    })
  }
  return ossShortUrl
}

export default SharedUploadPic
