module.exports = {
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  }
}
module.exports = {
  devServer: {
      proxy: {
          '/api': {
              target: 'http://localhost:8876/pic/',
              // 允许跨域
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  }
}
