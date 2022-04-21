const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const address = require('address')
// const portfinder = require('portfinder')
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const { createNotifierCallback } = require('./utils');
const { appIndexJs, appHtml } = require('./paths');
const devConfig = {
	target: 'web',
	mode: 'development',
	cache: true,
	devtool: 'inline-source-map', // 加上对应的配置  不然element plus控制台会有警告
	devServer: {
		open: true, //直接在浏览器打开
		// host: '0.0.0.0',
		compress: false, //启用 gzip compression：
		proxy: {
			// '/api': {
			//   target: 'http://localhost:3000',
			//   pathRewrite: { '^/api': '' },
			//   secure: false, //将不接受在 HTTPS 上运行且证书无效的后端服务器。 如果需要
			// },
		},
		port: process.env.PORT || 2023,
		headers: {
			'Access-Control-Allow-Origin': '*',
			// 'X-Custom-Foo': 'bar',
		},
		client: {
			progress: true, //在浏览器中以百分比显示编译进度。
			logging: 'error',
			overlay: {
				errors: true,
				warnings: false,
			}, //当出现编译错误或警告时，在浏览器中显示全屏覆盖。
		},
		hot: true,
		watchFiles: {
			paths: ['src/**/*', 'public/**/*'],
			options: {
				ignored: /node_modules/,
				usePolling: false,
			},
		},
		// clientLogLevel: 'none', //warning   none  废弃了
	},
	// watch: true, //有watchOptions就不需要watch， 使用webpack-dev-serve默认也就是开启的
	watchOptions: {
		// ignored: /node_modules/,
		ignored: ['/node_modules/'],
		aggregateTimeout: 1000, //防止重复按键，1000毫米内算按键一次  注意：老的写法aggregeateTimeout单词和现在不一样
		poll: 1000, //每秒检查一次变动
	},
	plugins: [
		new HtmlWebpackPlugin({
			templateParameters: {
				BASE_URL: `/`, //会植入到html文件中
			},
			filename: 'index.html',
			template: appHtml,
			inject: true,
		}),
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
};

const webpackConfig = merge(baseConfig, devConfig);

module.exports = webpackConfig;

// module.exports = new Promise((resolve, reject) => {
//   portfinder.basePort = webpackConfig.devServer.port
//   portfinder.getPort((err, port) => {
//     if (err) {
//       reject(err)
//     } else {
//       // publish the new Port, necessary for e2e tests
//       process.env.PORT = port
//       // add port to devServer config
//       webpackConfig.devServer.port = port
//       // Add FriendlyErrorsPlugin
//       webpackConfig.plugins.push(
//         new FriendlyErrorsPlugin({
//           compilationSuccessInfo: {
//             messages: [
//               `你的应用程序运行在: http://localhost:${
//                 webpackConfig.devServer.port
//               } or http://${address.ip()}:${webpackConfig.devServer.port}`,
//             ],
//           },
//           // onErrors: createNotifierCallback(),
//         })
//       )
//       resolve(webpackConfig)
//     }
//   })
// })
