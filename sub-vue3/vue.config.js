const path = require('path');
const { name } = require('./package');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 引入插件

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 7782;

module.exports = {
  outputDir: '../dist/vue-vue3',
  assetsDir: 'static',
  publicPath: '/subapp/vue-vue3',
  filenameHashing: true,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
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
  },
};
