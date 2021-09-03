// vue.config.js
const path = require('path')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  // 公共路径
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/', 
  publicPath: './',
  // 相对于打包路径index.html的路径
  indexPath: 'index.html', 
  // 'dist', 生产环境构建文件的目录
  outputDir: process.env.outputDir || 'dist', 
  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: 'static', 
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: false, 
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true, 
  // 生产环境的 source map
  productionSourceMap: !IS_PROD, 
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1, 
  // 向 PWA 插件传递选项。
  pwa: {
    name: 'inis默认主题',
    iconPaths: {
      // favicon64: 'favicon.ico',
      // favicon32: 'favicon.ico',
      // favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    },
    themeColor: '#727cf5'
  },
  chainWebpack: config => {
    // 修复热更新失效
    config.resolve.symlinks(true) 
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      return args
    })
    // 添加别名
    config.resolve.alias 
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
    // SVG配置 npm i svg-sprite-loader svgo-loader -D
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  css: {
    extract: IS_PROD,
    // 去掉文件名中的 .module
    requireModuleExtension: false 
  },
  // 代理
  // devServer: {
  //   // open: true,
  //   https: false,
  //   hotOnly: false,
  //   proxy: {
  //       '/api': {
  //           target: "https://test.inis.cn/api",
  //           changeOrigin: true,             // 是否跨域
  //           pathRewrite: {                  // 路径重置
  //               '^/api': ''
  //           }
  //       }
  //   }
  // }
}
