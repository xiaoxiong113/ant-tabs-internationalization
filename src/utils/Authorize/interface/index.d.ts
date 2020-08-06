/*
 * @description: 导出全部权限接口类型
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-06-08 11:05:43
 * @LastEditTime: 2020-06-10 11:55:32
 */ 
import AtomMcdHome from './mcdHome'
import AtomStaffManagement from './staffManagement'
import AtomAccountAuthority from './accountAuthority'
import FundraisingManagement from './fundraisingManagement'

export default interface Atom extends AtomMcdHome, AtomStaffManagement, AtomAccountAuthority, FundraisingManagement {}