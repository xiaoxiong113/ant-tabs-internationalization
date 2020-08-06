/*
 * @description: 叔叔之家
 * @author: songliubiao
 * @lastEditors: songliubiao
 * @Date: 2020-05-11 17:36:58
 * @LastEditTime: 2020-06-30 18:17:12
 */
import { Effect, Reducer } from 'umi';
import { getLeftMenu } from '@/services/myBase';

export interface MemberModelType {
  namespace: string;
  state: any;
  effects: {
    getAllMenuList: Effect;
  };
  reducers: {
    saveData: Reducer<any>;
  };
}
const member: MemberModelType = {
  namespace: 'myBase',
  state: {
    userInfo: {},
    LeftMenu: {},
  },

  reducers: {
    saveData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *getAllMenuList({ payload, callback }, { put, call }) {
      
      // 获取所有员工
      
      const { data } = yield call(getLeftMenu, payload);

      yield put({
        type: 'saveData',
        payload: {
          LeftMenu: data
        },
      });
      callback && callback(data);
    },
  },
};

export default member;
