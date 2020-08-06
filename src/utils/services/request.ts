/*
 * @description: 基于 axios 封装的请求
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 13:16:09
 * @LastEditTime: 2020-07-31 15:35:50
 */
import { history } from 'umi';

import axios from 'axios';

import { BASE_URL, TIMEOUT, REQUEST_METHOD, STATUS_CODE } from '@config/index';

import createInterceptors from './interceptor';

import MOMERY from '../Memo';

import Toast from '../Toast';

import { Instance, RequestOptions, RequestParams, Response, Methods } from './server';


class Request {
  axiosIns: Instance;

  // 是否是 mock 请求
  mock: boolean = false;

  // 是否显示请求 loading 效果
  isShowLoading: boolean = false;

  // loading 提示文本
  tipsText: string = '';

  upload: boolean = false;

  downLoad: boolean = false;

  constructor(options: RequestOptions = {}) {
    this.axiosIns = this.createInstance(options);
  }

  createInstance = ({
    mock = false,
    isShowLoading = false,
    tipsText = '加载中...',
    upload = false,
    downLoad = false,
  }) => {
    const instance = axios.create({
      baseURL: mock ? 'http://localhost:8000' : BASE_URL,
      timeout: TIMEOUT,
    });
    this.mock = mock;
    this.isShowLoading = isShowLoading;
    this.tipsText = tipsText;
    createInterceptors(instance, this, upload, downLoad);
    return instance;
  };

  // 发起请求
  // TODO - 请求过程是否添加 loading 效果待议
  // TODO - 联合类型下确定返回值类型
  request = async <R>(
    url: string,
    method: Methods,
    params?: RequestParams,
  ): Promise<Response<R>> => {
    const { axiosIns, isShowLoading: isShow, tipsText: text } = this;
    const { isShowLoading, tipsText, interceptor = false, meta, ...restParams } = params;
    
    const data = await axiosIns[method]<R>(
      url,
      method === 'post' ? restParams : { params: restParams },
    );
    const { code, message } = data;
    if (code === 1001 || code === 1006) {
      MOMERY.clearCache();
      Toast.toast(message[0],'error')
      history.replace('/user/login');
    }
    return data;

  };

  // get 请求
  get = <R = any>(url: string, params?: RequestParams) =>
    this.request<R>(url, <Methods>REQUEST_METHOD.GET, params);

  // post 请求
  post = <R = any>(url: string, params?: RequestParams) =>
    this.request<R>(url, <Methods>REQUEST_METHOD.POST, params);
}

export const request = new Request({ mock: false });

export const { axiosIns, get, post } = request;

export default Request;
