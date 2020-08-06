import { Subscription, Reducer } from 'umi';
import { KeyValue } from 'typings/common'

export interface Breadcrumb {
  path: string
  name: string
  type: 'link' | 'text'
  [key: string]: any
}

export interface GlobalModelState {
  collapsed: boolean;
  breadCrumb: Breadcrumb[];
  userInfo: KeyValue
  isChinaFund: boolean
  tabKey: string
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    setBreadCrumb: Reducer<GlobalModelState>;
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    setUserInfo: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    breadCrumb: [],
    userInfo: {},
    isChinaFund: false,
    tabKey: '1'
  },

  reducers: {
    setBreadCrumb(state, { payload }) {
      const { breadCrumbList, tabKey } = payload
      return {
        ...state!,
        breadCrumb: breadCrumbList,
        tabKey
      }
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state!,
        collapsed: payload,
      }
    },
    setUserInfo(state, { payload }) {
      return {
        ...state!,
        userInfo: payload,
        isChinaFund: payload.accountType < 1 // 中国麦基金角色登录
      }
    }
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
