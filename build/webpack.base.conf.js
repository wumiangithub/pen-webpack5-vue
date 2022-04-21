const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const CssExtractPlugin = require('mini-css-extract-plugin'); //分割css 而且production环境替代style-loader
const devMode = process.env.NODE_ENV !== 'production';
const { appIndexJs, appBuild, appSrc, appPenLib } = require('./paths');
const { getClientEnvironment } = require('./env');
const env = getClientEnvironment();
module.exports = {
	entry: {
		app: appIndexJs,
	},
	output: {
		path: appBuild, //dist目录
		filename: `static/js/[name].[hash:8].bundle.js`,
		chunkFilename: `static/js/[name].[hash:8].chunk.js`,
		publicPath: '/', //强调不能是./
		// assetModuleFilename: 'static/images/[hash][ext][query]',//图片文件等资源输出目录

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
				test: /\.(js|ts)x?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						},
					},
				],
				include: /src/,
				exclude: /node_modules/,
				// 注意： 当exclude中有需要解析的使用这种
				// exclude: {
				//   and: [/node_modules/], // Exclude libraries in node_modules ...
				//   not: [
				//     /unfetch/,
				//     /d3-array|d3-scale/,
				//     /@hapi[\\/]joi-date/,
				//   ],
				// },
			},
			{
				//oneOf  只匹配一个loader
				oneOf: [
					{
						test: /\.css$/,
						use: [
							// 'vue-style-loader', //vue-style-loader和style-loader二选一就可以
							// {
							// loader: 'style-loader',
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
							// },
							devMode ? 'style-loader' : CssExtractPlugin.loader, //代替了style-loader
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
						// exclude: /node_modules/, //css不能排除node_modules，不然像element plus一些插件会报错
					},
					{
						test: /\.scss$/,
						use: [
							// 'vue-style-loader',  //vue-style-loader和style-loader二选一就可以
							// 'style-loader',
							devMode ? 'style-loader' : CssExtractPlugin.loader, //代替了style-loader
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
					/*
      asset/inline会将文件作为 data URI 内联到 bundle 中
      asset/resource  生成一个文件链接
      asset根据文件大小自动转为asset/inline和asset/resource 默认8kb
      asset/source 导出资源的源代码。之前通过使用 raw-loader 实现  没用过
      */
					{
						test: /\.(woff|woff2|eot|ttf|otf)$/,
						type: 'asset/resource', //代替file-loader
						generator: {
							filename: 'static/fonts/[hash:8][ext][query]', //导出路径
						},
						exclude: /node_modules/,
					},
					{
						test: /\.(png|gif|bmp|svg|jpe?g)$/i,
						type: 'asset', //代替url-loader
						parser: {
							dataUrlCondition: {
								maxSize: 3 * 1024,
							},
						},
						generator: {
							filename: 'static/images/[hash:8][ext][query]', //导出路径
						},
						exclude: /node_modules/,
					},
				],
			},
		],
		noParse: /^(vue|vue-router|vuex|vuex-router-sync|react|react-dom|react-router)$/,
	},
	plugins: [
		new webpack.DefinePlugin({
			...env.stringified,
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: true,
		}),
		new VueLoaderPlugin(),
	],
	resolve: {
		//解析   可以是第三方包或者公众资源
		extensions: ['.ts', '.js', '.vue', '.css', '.scss', '.less', '.styl', '.tsx', '.jsx', '.json'], //引用资源的时候可以省略写后缀
		alias: {
			//别名
			'@': appSrc,
			'@pen-lib': appPenLib,
		},
	},
	optimization: {
		/* 
    默认为true。开启之后，有利于Tree-shaking剔除没有引入的代码 false的话是说，全部代码都没有副作用。
    要指定具体没有副作用的文件，可以去package.json中配置  适合组件库使用
     */
		// sideEffects: true,
	},
};
