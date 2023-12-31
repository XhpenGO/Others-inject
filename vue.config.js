const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


module.exports = defineConfig({
  // 静态资源路径
  publicPath:"/",
  transpileDependencies: true,
  lintOnSave:false,
  // 设置css的主入口文件
  css:{
    loaderOptions:{
      scss:{
        additionalData:`@import "./src/style/style.scss";`
      }
    }
  },
  configureWebpack:{
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
})
