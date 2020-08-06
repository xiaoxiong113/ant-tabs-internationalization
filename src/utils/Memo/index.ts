/*
 * @description: 项目通用的持久化状态管理，例如 token、用户信息、权限等
 * @author: huxianghe
 * @Date: 2020-05-17 16:04:19
 * @lastEditors: huxianghe
 * @LastEditTime: 2020-07-15 19:10:18
 */
import Storage from '../Storage';
import { TOKEN, UUID, AUTH, USER_INFO, INITIAL_LIST, PROJECT_LIST } from '../Storage/config';

type StorageTypes = 'TOKEN' | 'UUID' | 'AUTH' | 'USER_INFO' | 'PROJECT_LIST' | 'AUTHORITY_LIST';

interface CachedInfo {
  TOKEN: string | null;
  UUID: string | null;
  AUTH: any;
  USER_INFO: any;
  PROJECT_LIST: any;
  AUTHORITY_LIST: any
}

const INITIAL_MOME: CachedInfo = {
  TOKEN: null,
  UUID: null,
  AUTH: null,
  USER_INFO: null,
  PROJECT_LIST: null,
  AUTHORITY_LIST: null
};

export default new (class Momery {
  memoInfo: CachedInfo;

  constructor() {
    this.memoInfo = this.initialCachedInfo();
  }

  get isOnLine() {
    const { TOKEN: t, USER_INFO: u } = this.memoInfo;
    return !!t && !!u;
  }

  initialCachedInfo = () => {
    const memoInfo: CachedInfo = { ...INITIAL_MOME };
    for (const { type } of INITIAL_LIST) {
      memoInfo[type] = this.getCachedFromMemo(type as StorageTypes);
    }
    return memoInfo;
  };

  // 缓存值到内存中
  cachedToMemo = (k: StorageTypes, v: any) => {
    Storage.setLocalStorage(INITIAL_LIST.find((t) => t.type === k)!.value, v);
    this.memoInfo[k] = v;
    return this;
  };

  // 从内存中读取缓存值
  getCachedFromMemo(k: StorageTypes) {
    return Storage.getLocalStorage(INITIAL_LIST.find((t) => t.type === k)!.value);
  }

  // 清空缓存
  clearCache = () => {
    for (const { type, value } of INITIAL_LIST) {
      this.memoInfo[type] = value;
      Storage.clearLocalStorage(INITIAL_LIST.find((t) => t.type === type)!.value);
    }
  };
})();
