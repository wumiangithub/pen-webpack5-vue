module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	extends: [
		// 'plugin:vue/essential',  //vue2
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		// 'prettier/@typescript-eslint', //被废弃了，整合到prettier中了// Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
	],
	parser: 'vue-eslint-parser', //vue中使用eslint
	parserOptions: {
		ecmaVersion: 'latest',
		// parser: '@typescript-eslint/parser', //这个只适合ts加js
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint', 'prettier'],
	settings: {
		// react: {
		// 	version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
		// },
		'import/resolver': {
			// 识别 webpack 配置的路径别名
			webpack: {
				config: 'build/webpack.base.conf.js',
			},
		},
	},
	rules: {
		'prettier/prettier': 'error',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/multi-word-component-names': 'off', //组件命名必须为 xx-xx
		'@typescript-eslint/no-empty-function': 'off', //不能有空函数
		'vue/no-unused-components': 'warn', //引入组件但是未被使用
		'@typescript-eslint/no-this-alias': 'off', //不能使用that
		'no-unused-vars': 'off', //未使用变量
		'@typescript-eslint/no-unused-vars': ['off'],
		'vue/no-unused-vars': 'off', //没生效的话，需要配置setting.json
		'prefer-const': 'off', //要使用const
		'vue/no-multiple-template-root': 'off', //只能有一个根节点
	},
};
