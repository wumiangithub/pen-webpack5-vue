const { VueLoaderPlugin } = require('vue-loader')
const { appIndexJs, appBuild, appSrc, appPenLib } = require('./paths')
module.exports = {
  target: 'web',
  entry: {
    app: appIndexJs,
  },
  output: {
    path: appBuild,
    filename: `static/js/[name].[hash:8].bundle.js`,
    chunkFilename: `static/js/[name].[hash:8].chunk.js`,

    // filename: staticFolderName + `/js/[name].[chunkhash:8].bundle.js`,
    // chunkFilename: staticFolderName + `/js/[name].[chunkhash:8].chunk.js`,

    // filename: `static/js/[name].[chunkhash:8].${Date.now()}.js?[chunkhash:8]`,
    // chunkFilename: `static/js/[name].[chunkhash:8].${Date.now()}.chunk.js?[chunkhash:8]`,
    // publicPath: staticDomain,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: vueLoaderConfig,
        exclude: /node_modules/,
      },
      {
        //oneOf  只匹配一个loader
        oneOf: [
          {
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader',
                // options: {
                //   insert: function insertAtTop(element) {
                //     var parent = document.querySelector('head')
                //     var lastInsertedElement =
                //       window._lastElementInsertedByStyleLoader
                //     if (!lastInsertedElement) {
                //       parent.insertBefore(element, parent.firstChild)
                //     } else if (lastInsertedElement.nextSibling) {
                //       parent.insertBefore(element, lastInsertedElement.nextSibling)
                //     } else {
                //       parent.appendChild(element)
                //     }
                //     window._lastElementInsertedByStyleLoader = element
                //   },
                // },
              },
              {
                loader: 'css-loader',
                // options: {
                //   esModule: false,
                //   modules: {
                //     auto: false, //modules 开关,移动端多页面模式关闭class hash命名
                //     localIdentName: '[local]_[hash:base64:8]', // 自定义生成的类名
                //   },
                // },
              },
              // 'postcss-loader',
            ],
            exclude: /node_modules/,
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  // additionalData: `@use "~@/style/config.scss" as *;`, //@vue/cli中用法  这里不行
                  additionalData: `@import "~@/style/config.scss";`,
                },
              },
              // {
              //   loader: 'style-resources-loader',
              //   options: {
              //     patterns: pathUrl.configStyle,
              //     injector: 'append',
              //   },
              // },
            ],
            exclude: /node_modules/,
          },
        ],
        exclude: /node_modules/,
      },
    ],
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    //解析   可以是第三方包或者公众资源
    extensions: [
      '.ts',
      '.js',
      '.vue',
      '.css',
      '.scss',
      '.less',
      '.styl',
      '.tsx',
      '.jsx',
      '.json',
    ], //引用资源的时候可以省略写后缀
    alias: {
      //别名
      '@': appSrc,
      '@pen-lib': appPenLib,
    },
  },
}
