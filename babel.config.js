module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				/* 
			如果你在targets中只写了"chrome":67,那么你会看到你的生成的js文件语法等可能没有任何转化，因为chrome67版本已经支持了大部分es6的语法和方法，所以polyfill就不会再转化了。
			*/
				targets: {
					chrome: '67',
				},
				// targets: '> 0.25%, not dead',
				// targets: 'ie 11',
				// {
				//   targets: {
				//     // chrome: '60',
				//     // firefox: '60',
				//     ie: '11',
				//     // safari: '10',
				//     // edge: '17',
				//   },
				// },
			},
		],
		[
			'@babel/preset-typescript', // 引用Typescript插件
			{
				allExtensions: true, // ?支持所有文件扩展名
			},
		],
		// '@vue/cli-plugin-babel/preset', //@vue/cli中有看到在使用，目前没用也没出问题
	], //一定要配置target可以加快速度,减小体积
	plugins: [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-transform-runtime',
		['@babel/plugin-proposal-decorators', { legacy: true }],
	],
};
