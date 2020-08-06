// import api from 'common/api/index'
import api from '@/apiorzConfig/orz2'

import qs from 'qs'
import Helper from '@/utils/helper'
import request from '@/utils/request'

export async function getTree() {
    return request(api.getTree.url)
}

export async function getTreeCurrent() {
    return request(api.getTreeCurrent.url)
}

export async function getUser() {
    return request(api.getUser.url)
}
export async function getInitData(params) {
    return request(`${api.getInitData.url}?${qs.stringify(params)}`)
}

export async function querySmsCount(params) {
    return request(api.querySmsCount.url)
}

export async function OSSAuth(params) {
    return request(`${api.OSSAuth.url}?${qs.stringify(params)}`)
}

export async function COSAuth(params) {
    return request(`${Helper.format(api.COSAuth.url)}?${qs.stringify(params)}`)
}

export async function authToken(params) {
    return request(`${Helper.format(api.authToken.url)}?${qs.stringify(params)}`)
}

export async function getNoticeList(params) {
    return request(`${api.getNoticeList.url}?${qs.stringify(params)}`)
}


export async function getUnreadNum(params) {
    return request(`${api.getUnreadNum.url}?${qs.stringify(params)}`)
}

export async function setReadStatus(params) {
    return request(Helper.format(api.setReadStatus.url, { id: params.id }), {
        method: api.setReadStatus.type,
        body: params,
    })
}
