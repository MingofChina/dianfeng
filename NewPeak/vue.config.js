// 引入等比适配插件
const px2rem = require("postcss-px2rem")

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})
module.exports = {
    devServer: {
      proxy: {  
        '/api': {
          target: 'http://ceshi.davost.com', //路径指向本地主机地址及端口号
          ws: true, 
          changeOrigin: true,
          pathRewrite:{
              '^/api': '' //路径转发代理
          }
        }
      }
    },
    configureWebpack: {
      name: 'abslocker',
    },
    lintOnSave: false,
    css: {
      loaderOptions: {
        postcss: {
          plugins: [
            postcss
          ]
        }
      }
    }
  }
