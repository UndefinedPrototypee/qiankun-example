const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 引入插件

module.exports = {
  outputDir: '../dist/main',
  publicPath: '/',
  transpileDependencies: ['common'],
  devServer: {
    port: 8888
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = 'qiankun-example'
        return args
      })
  },
  lintOnSave: false,
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            // 删除注释
            output: {
              comments: false
            },
            // 删除console debugger 删除警告
            compress: {
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      ]
    }
  }
}
