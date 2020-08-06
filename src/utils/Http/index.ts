/*
 * @description: 解析 http url 工具类
 * @author: huxianghe
 * @Date: 2020-05-17 15:36:02
 * @lastEditors: huxianghe
 * @LastEditTime: 2020-05-17 15:38:51
 */
export default class HttpUtil {
  /* 将 url 查询参数解析成为对象 */
  static parseUrl (url: string) {
    if (url.indexOf('?') !== -1) {
      const query = url.split('?')[1]
      const queryList = query.split('&')
      const obj: any = {}
      queryList.forEach(item => {
        const [key, value] = item.split('=')
        obj[key] = decodeURIComponent(value)
      })
      return obj
    }
    return {}
  }
}
