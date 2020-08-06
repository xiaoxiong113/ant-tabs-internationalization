/*
 * @description: Apis 类型定义文件
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 16:52:22
 * @LastEditTime: 2020-06-29 17:54:23
 */
import { API_LOGIN_INDEX } from './sub-apis/login';
import { API_LABEL_INDEX } from './sub-apis/label';
import { API_COMMON_INDEX } from './sub-apis/common';
import { APIS_EMPLOYEE_INDEX } from './sub-apis/employee'

export default interface APIS_TYPES
  extends API_HOME_INDEX,
    API_COMMON_INDEX,
    API_LOGIN_INDEX,
    APIS_EMPLOYEE_INDEX,
    API_LABEL_INDEX {}
