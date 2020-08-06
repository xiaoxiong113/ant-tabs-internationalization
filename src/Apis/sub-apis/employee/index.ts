/*
 * @description: 基础标签 apis 
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-05-15 14:38:26
 * @LastEditTime: 2020-07-21 18:05:49
 */ 
import { REQUEST_VERISION } from '@/config/index'

export default {
  add:`/smartSite/user/${REQUEST_VERISION}/add`, // 员工管理新增
  delete:`/smartSite/user/${REQUEST_VERISION}/del`, // 员工管理删除
  edit:`/smartSite/user/${REQUEST_VERISION}/edit`, // 员工管理编辑
  enableOrDisable: `/smartSite/user/${REQUEST_VERISION}/enableOrDisable `,
  list:`/smartSite/user/${REQUEST_VERISION}/list`, // 员工管理列表
  upload: `/smartSite/user/${REQUEST_VERISION}/upload `,
  positionList: `/smartSite/position/${REQUEST_VERISION}/positionList`,
  permissionList: `/smartSite/permission/${REQUEST_VERISION}/list`,
  info: `/smartSite/user/${REQUEST_VERISION}/info`,
  download: `/smartSite/user/${REQUEST_VERISION}/download`, //下载模板
  uploadZip: `/smartSite/user/${REQUEST_VERISION}/uploadPic`, //上传所有
  getProjects: `/smartSite/project/${REQUEST_VERISION}/getProjects`,  // 下拉菜单项目集合

}
