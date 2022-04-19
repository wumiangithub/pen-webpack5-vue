const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const { appHtml } = require('./paths')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const APP_ANALYZER = process.env.APP_ANALYZER
const baseConfig = require('./webpack.base.conf.js')

const prodConfig = {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        BASE_URL: `/`, //会植入到html文件中
      },
      filename: 'index.html',
      template: appHtml,
      inject: true,
      minify: {
        removeAttributeQuotes: true, //去除html中的双引号
        removeComments: true, //将html中的注释去除
        collapseWhitespace: true, //将html缩为一行   不推荐   但是在使用html-withimg-loader这个处理html中图片资源的loader也将html缩为1行了
      },
      // chunksSortMode: 'auto',
    }),
  ],
}

if (APP_ANALYZER) {
	prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

const webpackConfig = merge(baseConfig, prodConfig)

module.exports = webpackConfig
