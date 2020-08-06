/*
 * @description: 
 * @author: xiaoxiong
 * @lastEditors: xiaoxiong
 * @Date: 2020-07-07 11:16:37
 */ 
import { REQUEST_VERISION } from '@/config/index'

export default {
  add:`/smartSite/device/${REQUEST_VERISION}/add`, // 设备添加
  update:`/smartSite/device/${REQUEST_VERISION}/updateDevice`, // 设备修改
  batchUpdate: `/smartSite/device/${REQUEST_VERISION}/batchUpdate`, // 批量启用停用
  list:`/smartSite/device/${REQUEST_VERISION}/deviceList`, // 设备列表
  
  smartService: `/smartSite/device/${REQUEST_VERISION}/smartService` //算法服务器下拉
}