const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin'); //开启gzip
const TerserPlugin = require('terser-webpack-plugin'); //各种压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //压缩css
/* 
不要同时使用 style-loader 与 mini-css-extract-plugin。 开发环境使用style-loader更快
*/
const CssExtractPlugin = require('mini-css-extract-plugin'); //分割css 而且production环境替代style-loader
const { merge } = require('webpack-merge');
const { appHtml } = require('./paths');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const APP_ANALYZER = process.env.APP_ANALYZER;
const baseConfig = require('./webpack.base.conf.js');

const prodConfig = {
	mode: 'production',
	output: {
		clean: true, // 打包前清空输出目录，相当于clean-webpack-plugin插件的作用,webpack5新增
	},
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
		new CssExtractPlugin({
			//分隔css
			filename: 'static/css/[name].[hash:8].css',
		}),
		new CompressionPlugin({
			//压缩gzip
			algorithm: 'gzip',
			threshold: 10240,
			minRatio: 0.8,
			compressionOptions: { level: 9 }, //最大压缩级别为9，默认就是9
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			//压缩js等
			new TerserPlugin({
				// cache: true,  //webpack5没有了
				parallel: true,
				terserOptions: {
					ecma: 6,
				},
			}),
			//压缩css
			new CssMinimizerPlugin({
				test: /\.(c|sc|le)ss$/,
				parallel: true,
				exclude: /node_modules/,
				// include: /\/includes/,
				// filename: `static/css/[name].[hash:8].bundle.js`,
				// chunkFilename: `static/css/[name].[hash:8].chunk.js`,
			}),
		],
		splitChunks: {
			chunks: 'all',
			// cacheGroups: {
			//   styles: {
			//     name: "styles",
			//     type: "css/mini-extract",
			//     chunks: "all",
			//     enforce: true,
			//   },
			// },  //这个会将所有css提取到一个文件中
		},
		runtimeChunk: true,
	},
};

if (APP_ANALYZER) {
	prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

const webpackConfig = merge(baseConfig, prodConfig);

module.exports = webpackConfig;
