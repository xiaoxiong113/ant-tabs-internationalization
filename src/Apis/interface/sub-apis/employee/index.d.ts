
declare const APIS: [
  'API_EMPLOYEE_INDEX_ADD',
  'API_EMPLOYEE_INDEX_DELETE',
  'API_EMPLOYEE_INDEX_EDIT',
  'API_EMPLOYEE_INDEX_ENABLEORDISABLE',
  'API_EMPLOYEE_INDEX_LIST',
  'API_EMPLOYEE_INDEX_UPLOAD',
  'API_EMPLOYEE_INDEX_POSITIONLIST',
  'API_EMPLOYEE_INDEX_PERMISSIONLIST',
  'API_EMPLOYEE_INDEX_INFO',
  'API_EMPLOYEE_INDEX_DOWNLOAD',
  'API_EMPLOYEE_INDEX_UPLOADZIP',
  'API_EMPLOYEE_INDEX_GETPROJECTS',
];

type APIS_EMPLOYEE = {
  [api in typeof APIS[number]]: string;
};

export interface APIS_EMPLOYEE_INDEX {
  APIS_EMPLOYEE: APIS_EMPLOYEE
}