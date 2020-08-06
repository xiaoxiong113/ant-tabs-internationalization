/*
 * @description: 
 * @author: xiaoxiong
 * @lastEditors: xiaoxiong
 * @Date: 2020-06-22 15:16:55
 */ 
import config from './orz'

export default Object.assign({
  apiHost: '',
  accessTokenKey: 'ACCESS_TOKEN_KEY',
  globalPagePaths: [
      '/find_password',
      '/login',
      '/register',
      '/register/agreement',
      '/403',
      '/auto_login',
      '/big_screen'
  ],
  ignoreCheckPagesPermissionPaths: [
      '/app/:id',
      '/app_preview',
      '/find_password',
      '/login',
      '/register',
      '/register/agreement',
      '/demo/upload',
      '/403',
      '/',
      '/auto_login',
      '/big_screen'
  ],
  hiddenMenuForPath: [],
  niukefuUrl: '',
}, config)