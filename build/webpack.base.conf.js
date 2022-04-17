const { appIndexJs, appBuild } = require('./paths')
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
  plugins: [],
}
