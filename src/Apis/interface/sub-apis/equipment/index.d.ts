/*
 * @description: 
 * @author: xiaoxiong
 * @lastEditors: xiaoxiong
 * @Date: 2020-07-07 11:16:37
 */ 

declare const APIS: [
  'API_EQUIPMENT_INDEX_ADD',
  'API_EQUIPMENT_INDEX_BATCHUPDATE',
  'API_EQUIPMENT_INDEX_LIST',
  'API_EQUIPMENT_INDEX_UPDATE',
  'API_EQUIPMENT_INDEX_SMARTSERVICE',
];

type APIS_EQUIPMENT = {
  [api in typeof APIS[number]]: string;
};

export interface APIS_EQUIPMENT_INDEX {
  APIS_EQUIPMENT: APIS_EQUIPMENT
}