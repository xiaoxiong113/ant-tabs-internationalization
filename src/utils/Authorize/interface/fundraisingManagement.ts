/*
 * @description: 
 * @author: qiuyang
 * @lastEditors: qiuyang
 * @Date: 2020-06-10 11:46:29
 * @LastEditTime: 2020-06-10 11:48:39
 * @Copyright: Copyright  2019 Shanghai Yejia Digital Technology Co., Ltd. All rights reserved.
 */ 
declare const fundraisingManagementType: [
  'QX000400000000',
  'QX000400010000', // 捐赠人信息
  'QX000400010001', // 查看
  'QX000400010002', // 操作
  'QX000400020000', // 捐赠物资管理
  'QX000400020001', // 查看
  'QX000400020002', // 操作
]

export default interface McdHome {
  fundraisingManagement: (typeof fundraisingManagementType[number])[]
}