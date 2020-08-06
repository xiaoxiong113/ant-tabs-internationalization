import request from '@/utils/request';

import  Apis from '@/Apis'

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/current');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
