/*
 * @description: 职务/工种 apis 
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-05-15 14:38:26
 * @LastEditTime: 2020-06-30 14:41:32
 */ 
import { REQUEST_VERISION } from '@/config/index'

export default {
  list:`/smartSite/position/${REQUEST_VERISION}/list`, // 职务/工种列表
  add:`/smartSite/position/${REQUEST_VERISION}/add`, // 职务/工种新增
  delete:`/smartSite/position/${REQUEST_VERISION}/del`, // 职务/工种删除
  edit:`/smartSite/position/${REQUEST_VERISION}/edit`, // 职务/工种编辑
  enableOrDisable:`/smartSite/position/${REQUEST_VERISION}/enableOrDisable`, // 职务/工种 启动、禁用
  positionList:`/smartSite/position/${REQUEST_VERISION}/positionList`, // 职务/工种 获取所有职务/工种
  check:`/smartSite/position/${REQUEST_VERISION}/check`, // 职务/工种 检查职务/工种是否重复
}
