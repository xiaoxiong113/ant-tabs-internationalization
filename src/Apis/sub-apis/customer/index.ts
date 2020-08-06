/*
 * @description: 访客管理 apis 
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-05-15 14:38:26
 * @LastEditTime: 2020-06-30 10:17:30
 */ 
import { REQUEST_VERISION } from '@/config/index'

export default {
  list:`/smartSite/visitor/${REQUEST_VERISION}/list`, // 访客管理列表
  add:`/smartSite/visitor/${REQUEST_VERISION}/add`, // 访客管理新增
  edit:`/smartSite/visitor/${REQUEST_VERISION}/edit`, // 访客管理编辑
  delete:`/smartSite/visitor/${REQUEST_VERISION}/del`, // 访客管理删除
  look:`/smartSite/visitor/${REQUEST_VERISION}/look `// 访客管理查看
}
