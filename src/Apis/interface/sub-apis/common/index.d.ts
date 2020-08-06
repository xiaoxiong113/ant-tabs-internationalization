/*
 * @description:
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-26 10:01:21
 * @LastEditTime: 2020-07-14 17:16:43
 */
declare const APIS: [
  'API_COMMON_INDEX_UPLOADPIC',
  'API_COMMON_INDEX_EXPORTEXCEL',
  'API_COMMON_INDEX_EXPORTTEMPLATE',
  'API_COMMON_INDEX_IMPORTEXCEL',
  'API_COMMON_INDEX_AUTHLIST',
  'API_COMMON_INDEX_PROJECTS',
];

type APIS_COMMON = {
  [api in typeof APIS[number]]: string;
};

export interface API_COMMON_INDEX {
  API_COMMON_INDEX: APIS_COMMON;
}
