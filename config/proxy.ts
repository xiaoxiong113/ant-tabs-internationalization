/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/smartSite': {
      target: 'http://test-stwebapi.xinke86.com//smartSite/',
      changeOrigin: true,
      pathRewrite: {
        '^/smartSite': '',
      },
    },
    '/photoCheck': {
      target: 'http://test-stwebapi.xinke86.com//photoCheck',
      changeOrigin: true,
      pathRewrite: {
        '^/photoCheck': '',
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
}
