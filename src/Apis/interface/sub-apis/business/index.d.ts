/*
 * @description: 职务/工种 apis 类型定义
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-06-28 13:32:51
 * @LastEditTime: 2020-06-30 14:42:01
 */

declare const APIS: [
  'API_BUSINESS_INDEX_ADD',
  'API_BUSINESS_INDEX_DELETE',
  'API_BUSINESS_INDEX_EDIT',
  'API_BUSINESS_INDEX_ENABLEORDISABLE',
  'API_BUSINESS_INDEX_LIST',
  'API_BUSINESS_INDEX_POSITIONLIST',
  'API_BUSINESS_INDEX_CHECK'
];

type APIS_BUSINESS_INDEX = {
  [api in typeof APIS[number]]: string;
};

export interface APIS_BUSINESS_INDEX {
  APIS_BUSINESS_INDEX;
}
