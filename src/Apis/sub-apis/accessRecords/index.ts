/*
 * @description: 人员进出记录 apis 
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-05-15 14:38:26
 * @LastEditTime: 2020-07-01 14:00:41
 */ 
import { REQUEST_VERISION } from '@/config/index'

export default {
  list:`/smartSite/access/${REQUEST_VERISION}/list`, // 人员进出记录列表
  export: `/smartSite/access/${REQUEST_VERISION}/export` // 人员进出记录导出
 
}
