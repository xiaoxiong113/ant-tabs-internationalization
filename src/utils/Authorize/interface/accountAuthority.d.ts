/*
 * @description: 
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-06-08 14:01:32
 * @LastEditTime: 2020-06-08 14:01:33
 */
declare const AccountAuthorityType: [
  'QX000700000000',
  'QX000700010000',
  'QX000700010001',
  'QX000700010002'
]

export default interface McdHome {
  accountAuthority: (typeof AccountAuthorityType[number])[]
}
