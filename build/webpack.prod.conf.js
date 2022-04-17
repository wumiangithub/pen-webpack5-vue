const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const { appHtml } = require('./paths')

const baseConfig = require('./webpack.base.conf.js')

const prodConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: appHtml,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: 'dependency',
    }),
  ],
}

const webpackConfig = merge(baseConfig, prodConfig)

module.exports = webpackConfig
