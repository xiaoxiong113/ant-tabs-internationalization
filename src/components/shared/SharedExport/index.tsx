/*
 * @description: 导出组件
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-27 09:31:04
 * @LastEditTime: 2020-07-14 17:21:53
 */
import React, { FC } from 'react'
import { BaseSharedButton } from '../SharedButton'

import { REQUEST, Toast } from '@utils/index'

import APIS from '@/Apis'



interface SharedExportProps {
  // 导出地址
  url?: string
  form?: any
  // 导出参数
  params: any,
  btnTxt?: '下载导入模版' | '批量导出'
  iconType?: 'download' | 'export'
  // 导出的文件名
  fileName?: string
  // 导出文件后缀 xlsx  xls，默认为 .xlsx
  suffix?: 'xlsx' | 'xls',
  // 下载或者导出成功回调
  onExportSuccess?: Function
}

const { API_ACCESSRECORDS_INDEX_EXPORT } = APIS.API_ACCESSRECORDS_INDEX

// 创建下载链接
const createDownloadLink = (excelUrl: any, fileName?: any) => {
  if (!excelUrl) return
  const blob = new Blob([excelUrl])
  const url = window.URL.createObjectURL(blob);
  const aLink = document.createElement('a')
  aLink.style.display = 'none'
  aLink.href = url
  aLink.setAttribute('download', fileName)
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
}


const BaseSharedExport: FC<SharedExportProps> = (props) => {
  const { onExportSuccess, url = '', params, btnTxt = '下载导入模版', iconType = 'download', fileName = '智慧工地导出文件', suffix = 'xlsx' } = props

  // 判断功能
  const isDownload = iconType === 'download'
  const downExcel = async () => {
    const excelUrl = await REQUEST.axiosIns({
      method: 'post',
      url: url! || API_ACCESSRECORDS_INDEX_EXPORT,
      data: params,
      responseType: 'blob'
    })

    if (!excelUrl) {
      Toast.toast('导出失败', 'error')
      return
    }
    createDownloadLink(excelUrl, `${fileName}.${suffix}`)
    onExportSuccess && onExportSuccess('chengg')
  }

  return (
    <BaseSharedButton iconType={iconType} btnTxt={btnTxt} handleClick={downExcel} />
  )
}

export default BaseSharedExport
