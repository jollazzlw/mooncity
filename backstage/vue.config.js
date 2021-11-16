const path = require('path');

module.exports = {
  // publicPath: process.env.NODE_ENV === '/',
  lintOnSave: false,//这里禁止使用eslint-loader
  configureWebpack: (config) => {
    // 配置解析别名
    config.resolve = {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        'vue': 'vue/dist/vue.js',
        '@': path.resolve(__dirname, './src'),
        '@img': path.resolve(__dirname, './src/assets/img'),
        '@assets': path.resolve(__dirname, './src/assets'),

      },

    },
      config.optimization.splitChunks.cacheGroups = {
        styles: {
          name: 'styles',
          test: /\.(le|sa|sc|c)ss$/,
          chunks: 'all',
          reuseExistingChunk: true,
          minChunks: 1,
          enforce: true
        }
      }
  }
}
