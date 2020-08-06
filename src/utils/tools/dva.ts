export function getDva() {
    return window.g_app || {}
}

export function getStore() {
    return getDva()._store || {}
}

export function getDispatch() {
    return getStore().dispatch
}
