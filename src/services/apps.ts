import api from '@/apiorzConfig/orz'
import request from '@/utils/request'
import { format } from '@/utils'
import { stringify } from 'qs'

export async function appsClick(params) {
	return request(`${format(api.appsClick.url, { id: params.id })}?${stringify(params)}`, null, {
		errorShow: false,
	})
}

export async function getApp(params) {
	return request(`${format(api.getApp.url, { id: params.id })}?${stringify(params)}`)
}

export async function recentApps(params) {
	return request(`${api.recentApps.url}?${stringify(params)}`)
}

export async function deleteRecentApp(params = {}) {
	return request(format(api.deleteRecentApp.url, { id: params.id }), {
		method: api.deleteRecentApp.type,
		body: params.body,
	}, {
		errorShow: false,
	})
}

export async function frequentApps(params) {
	return request(`${api.frequentApps.url}?${stringify(params)}`)
}

export async function addFrequentApps(params = {}) {
	return request(api.addFrequentApps.url, {
		method: api.addFrequentApps.type,
		body: params.body,
	}, {
		errorShow: false,
	})
}

export async function deleteFrequentApps(params = {}) {
	return request(format(api.deleteFrequentApps.url, { id: params.id }), {
		method: api.deleteFrequentApps.type,
		body: params.body,
	}, {
		errorShow: false,
	})
}
