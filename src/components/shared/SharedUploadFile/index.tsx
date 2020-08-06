/*
 * @description: 导入 excel 文件组件
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-27 11:48:18
 * @LastEditTime: 2020-06-15 16:33:27
 */
import React, { FC, useState } from 'react'
import RcUpload from 'rc-upload'
import { BaseSharedButton } from '../SharedButton'

import { REQUEST, Toast, ComUtil } from '@utils/index'

import APIS from '@/Apis'

// 导入的参数格式
interface ExportParams {
  // 导出的文件类型: 1-志愿者导入，2-捐赠者导入，3-入住家庭导入，4-服务问卷表单导入
  fileType: ['1', '2', '3', '4'][number]
  // 用户类型: 0-志愿者个人,1-志愿者团体,2-捐赠者个人 3-捐赠者团队, 4-入住家庭, 5-服务问卷
  userType: [0, 1, 2, 3, 4, 5][number]
  // 角色类型: 0-中国麦基金,1-麦当劳叔叔之家
  accountType: [0, 1][number]
  // 机构号
  orgId?: string
}

interface SharedUploadProps {
  // 上传接口
  url?: string
  // 上传 file 对象的字段名
  fieldName?: string
  // 是否多文件上传
  multiple?: boolean
  // 文件的限制大小
  fileSize?: number
  // 上传的文件格式
  accept?: string[]
  // 导出参数
  params: ExportParams,
  btnTxt?: string
  // 上传成功的回调
  onUploadSuccess?: Function
}

const { API_COMMON_INDEX_IMPORTEXCEL } = APIS.API_COMMON_INDEX


const BaseSharedUploadFile: FC<SharedUploadProps> = (props) => {
  const [disabled, setDisabled] = useState(false)
  const {
    fieldName = 'file', multiple = false, fileSize = 8, accept = ['.xlsx', '.xls'],
    btnTxt = '批量导入', url,
    params, onUploadSuccess
  } = props

  const beforeUpload = (file: File) => {
    setDisabled(true)
    const { size, name } = file
    const lastIndex = name.lastIndexOf('.')
    const suf = name.substring(lastIndex, name.length)
    const { include } = ComUtil.inArray(suf, accept)
    if (!include) {
      Toast.toast('请上传正确的文件', 'error')
      return false
    }
    if ((size / 1024 / 1024) > fileSize!) {
      Toast.toast(`上传文件的大小不能超过${fileSize}M`, 'warning')
      return false
    }
    return true
  }

  const uploadSuccess = (data: any) => {
    onUploadSuccess && onUploadSuccess(data)
  }

  const customRequest = async (request: any) => {
    const { action, file, filename, onSuccess } = request
    const formData = new FormData()
    formData.append(filename, file, file.name)
    if (params) {
      for (const key in params) {
        formData.append(key, params[key])
      }
    }
    const { code, data, message }: any = await REQUEST.axiosIns({
      method: 'post',
      url: action,
      data: formData,
      timeout: 5 * 60 * 1000
    })
    setDisabled(false)
    if (code !== 200) {
      Toast.toast(`导入失败: ${message[0]}`, 'error')
      return
    }
    Toast.toast(`${message[0]}`)
    onSuccess(data)
  }

  const rcUploadConfig = {
    action: url || API_COMMON_INDEX_IMPORTEXCEL,
    name: fieldName,
    accept: accept.join(),
    multiple,
    onSuccess: uploadSuccess,
    beforeUpload,
    customRequest
  }

  return (
    <RcUpload {...rcUploadConfig}>
      <BaseSharedButton disabled={disabled} iconType="import" btnTxt={btnTxt} />
    </RcUpload>
  )
}

export default BaseSharedUploadFile
