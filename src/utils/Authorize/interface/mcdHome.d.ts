/*
 * @description: 麦当劳叔叔之家权限接口
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-06-08 11:07:34
 * @LastEditTime: 2020-06-08 13:23:42
 */
declare const McdHomeType: [
  'QX000200000000',
  'QX000200010000',
  'QX000200010001',
  'QX000200010002'
]

export default interface McdHome {
  mcdHome: (typeof McdHomeType[number])[]
}
