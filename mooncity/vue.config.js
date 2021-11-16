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
        '@api': path.resolve(__dirname, './src/api'),
        '@img': path.resolve(__dirname, './src/assets/img'),
        '@content': path.resolve(__dirname, './src/components/content'),
        '@common': path.resolve(__dirname, './src/components/common'),
        '@views': path.resolve(__dirname, './src/views'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@style': path.resolve(__dirname, './src/style'),
        '@utils': path.resolve(__dirname, './src/utils'),
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
