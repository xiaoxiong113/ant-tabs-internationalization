/**
 * 文件说明:
 * ----------------------------------------
 * 创建用户: zhousong
 */
import _ from 'lodash'

export const globalActionsType = {
    logout: 'globalActions/logout',
    resetState: 'globalActions/resetState',
}

export function resetState({namespace}) {
    dispatch({
        type: globalActionsType.resetState,
        payload: {
            namespace,
        },
    })
}

export function getDva() {
    return _.get(window, 'g_app', {})
}

export function getStore() {
    return getDva()._store
}

export function getState() {
    const store = getStore()
    if (store && typeof store.getState === 'function') {
        return store.getState()
    }
}

export function dispatch(...arg) {
    const store = getStore()
    if (store && typeof store.dispatch === 'function') {
        return store.dispatch(...arg)
    }
}
