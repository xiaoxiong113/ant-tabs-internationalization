/*
 * @description: 登录 apis
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 15:52:42
 * @LastEditTime: 2020-07-15 18:25:40
 */
import { REQUEST_VERISION } from '@/config/index'

export default {
  getCaptcha: `/lunara/auth/${REQUEST_VERISION}/imageCaptcha`,
  login:`/smartSite/auth/${REQUEST_VERISION}/login`,
  out: `/lunara/auth/${REQUEST_VERISION}/webLogout`,
  list: `/smartSite/permission/${REQUEST_VERISION}/list`
}
