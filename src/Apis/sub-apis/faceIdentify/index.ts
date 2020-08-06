/*
 * @description: 人脸识别管理 apis 
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-05-15 14:38:26
 * @LastEditTime: 2020-07-22 19:24:07
 */ 
import { REQUEST_VERISION } from '@/config/index'

export default {
  list:`/smartSite/recognition/${REQUEST_VERISION}/list`, // 人脸识别管理列表
  userList: `/smartSite/recognition/${REQUEST_VERISION}/userList`, // 人员列表/操作日志
  passageList: `/smartSite/passage/${REQUEST_VERISION}/passageList`, // 获取所通行组
  add: `/smartSite/passage/${REQUEST_VERISION}/add`, // 新增通行组
  edit: `/smartSite/passage/${REQUEST_VERISION}/edit`, // 编辑通行组
  del: `/smartSite/passage/${REQUEST_VERISION}/del`, // 删除通行组
  shuttleList: `/smartSite/recognition/${REQUEST_VERISION}/shuttleList`, // 同步部门人员穿梭框
  custom: `/smartSite/recognition/${REQUEST_VERISION}/custom`, // 自定义同步
  globalCustom: `/smartSite/recognition/${REQUEST_VERISION}/globalCustom` // 全局同步
}
