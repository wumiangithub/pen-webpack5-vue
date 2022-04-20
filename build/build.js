const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf.js');
console.log('build==start');
const spinner = ora(process.env.NODE_ENV + '环境打包中...' + process.env.REACT_APP_NODE_ENV);
spinner.start();

webpack(webpackConfig, (err, stats) => {
	spinner.stop();
	if (err) {
		throw err;
	}
	process.stdout.write(
		stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false,
		}) + '\n\n',
	);

	if (stats.hasErrors()) {
		console.log(chalk.red('  打包有错误导致失败了.\n'));
		process.exit(1);
	}

	console.log(chalk.cyan('  打包完成.\n'));
	console.log(
		chalk.yellow(
			'  Tip: built files are meant to be served over an HTTP server.\n' +
				"  Opening index.html over file:// won't work.\n",
		),
	);
});
