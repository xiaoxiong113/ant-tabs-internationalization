/*
 * @description: 员工权限接口定义
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-06-08 13:51:17
 * @LastEditTime: 2020-06-08 14:02:36
 */
declare const StaffManagementType: [
  'QX000200000000',
  'QX000200010000',
  'QX000200010001',
  'QX000200010002'
]

export default interface McdHome {
  staffManagement: (typeof StaffManagementType[number])[]
}
