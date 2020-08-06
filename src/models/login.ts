import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import { getLogin, apiAuthority} from '@services/login';

export interface LoginModelType {
  namespace: string;
  state: any;
  effects: {
    login: Effect;
    logout: Effect;
    getAuthorityList: Effect;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(getLogin, payload);
      callback(response);
    },

    logout() {
      // const { redirect } = getPageQuery();
      // // Note: There may be security issues, please note
      // if (window.location.pathname !== '/user/login' && !redirect) {
      //   history.replace({
      //     pathname: '/user/login',
      //     search: stringify({
      //       redirect: window.location.href,
      //     }),
      //   });
      // }
    },
    *getAuthorityList({ payload, callback }, { put, call }) {
      const { data } = yield call(apiAuthority, payload);
      yield put({
        type: 'getList',
        payload: data,
      });
      if (callback) callback(data);
    },
  },
};

export default Model;
