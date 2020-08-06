/*
 * @description: 
 * @author: xiaoxiong
 * @lastEditors: xiaoxiong
 * @Date: 2020-06-22 14:29:19
 */ 
// import config from 'config'
let config = {
  apiOpenHost: 'http://test-stwebapi.xinke86.com/',
  apiHost: 'http://test-stwebapi.xinke86.com/'
}
export default {
    getApp: {
        url: `${config.apiOpenHost}/api/crm/apps/{id}`,
        type: 'GET',
    },
    appsClick: {
        url: `${config.apiOpenHost}/api/crm/apps/{id}/click`,
        type: 'GET',
    },
    recentApps: {
        url: `${config.apiOpenHost}/api/crm/recent_apps`,
        type: 'GET',
    },
    deleteRecentApp: {
        url: `${config.apiOpenHost}/api/crm/recent_apps/{id}`,
        type: 'DELETE',
    },
    frequentApps: {
        url: `${config.apiOpenHost}/api/crm/frequent_apps`,
        type: 'GET',
    },
    addFrequentApps: {
        url: `${config.apiOpenHost}/api/crm/frequent_apps`,
        type: 'POST',
    },
    deleteFrequentApps: {
        url: `${config.apiOpenHost}/api/crm/frequent_apps/{id}`,
        type: 'DELETE',
    },
}
