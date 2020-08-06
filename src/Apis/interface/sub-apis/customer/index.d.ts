/*
 * @description: 访客管理 apis 类型定义
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-06-28 13:32:51
 * @LastEditTime: 2020-06-30 10:16:52
 */

declare const APIS: [
  'API_CUSTOMER_INDEX_LIST',
  'API_CUSTOMER_INDEX_ADD',
  'API_CUSTOMER_INDEX_DELETE',
  'API_CUSTOMER_INDEX_EDIT',
  'API_CUSTOMER_INDEX_LOOK'
 
];

type APIS_CUSTOMER_INDEX = {
  [api in typeof APIS[number]]: string;
};

export interface APIS_CUSTOMER_INDEX {
  APIS_CUSTOMER_INDEX
}
