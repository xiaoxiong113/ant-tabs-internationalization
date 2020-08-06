/*
 * @description: 人员进出记录 apis  类型定义
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-05-15 14:38:26
 * @LastEditTime: 2020-07-01 14:03:14
 */ 
declare const APIS: [
  'API_ACCESSRECORDS_INDEX_LIST',
  'API_ACCESSRECORDS_INDEX_EXPORT',
 
];

type API_ACCESSRECORDS_INDEX = {
  [api in typeof APIS[number]]: string;
};

export interface API_ACCESSRECORDS_INDEX {
  API_ACCESSRECORDS_INDEX;
}
