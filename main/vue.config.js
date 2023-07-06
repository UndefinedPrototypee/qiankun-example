module.exports = {
  outputDir: '../dist/main',
  publicPath: '/subapp/main',
  transpileDependencies: ['common'],
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = 'qiankun-example'
        return args
      })
  }
}
