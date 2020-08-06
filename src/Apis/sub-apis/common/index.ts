/*
 * @description: 通用 api，例如上传图片
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-26 09:56:53
 * @LastEditTime: 2020-07-24 16:31:27
 */
import { REQUEST_VERISION } from '@config/index'

export default {
  // 需要在路径末端添加 存储路径： 1(叔叔之家相关图片),2(志愿者相关图片)
  // 例如上传叔叔之家： /lunara/common/${REQUEST_VERISION}/insertOssUploadByFiles/1
  uploadPic: `/photoCheck`,
  // 报表导出，导出[志愿者、捐赠者、入住家庭、服务问卷]模块的列表数据
  exportExcel: `/lunara/export/${REQUEST_VERISION}/exportExcel`,
  // 下载导入模板
  exportTemplate: `/lunara/export/${REQUEST_VERISION}/exportTemplate`,
  // 导入
  importExcel: `/lunara/export/${REQUEST_VERISION}/uploadExcel`,
  // 全部权限列表
  authList: `/lunara/perm/${REQUEST_VERISION}/findGrantedPermsList`,
  // 全部权限列表
  projects: `/smartSite/project/${REQUEST_VERISION}/getProjects`,
}
