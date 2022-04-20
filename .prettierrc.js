//.prettierrc 可直接跳
module.exports = {
	// bracketSpacing: true,
	// jsxBracketSameLine: true,
	// arrowParens: 'always',
	// embeddedLanguageFormatting: 'off',
	// indent: [
	// 	'warn',
	// 	'tab',
	// 	//强制统一缩进
	// ],
	// overrides: [
	// 	{
	// 		files: '.prettierrc',
	// 		options: { parser: 'json' },
	// 	},
	// ],
	singleQuote: true, // 强制单引号
	trailingComma: 'all', // 尾随逗号
	printWidth: 120, //换行宽度
	tabWidth: 4,
	useTabs: true,
	semi: true, //分号
	proseWrap: 'never', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
	quoteProps: 'as-needed', //对象属性加不加引号
	bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
	htmlWhitespaceSensitivity: 'css', //遵守CSS显示属性的默认值 "strict" - 空格被认为是敏感的  "ignore" - 空格被认为是不敏感的
	endOfLine: 'auto', // 结尾是 \n \r \n\r auto
	jsxBracketSameLine: true, //未尾标签换行
	embeddedLanguageFormatting: 'off', //对引用代码进行格式化
	arrowParens: 'avoid', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
	// jsxSingleQuote: false,  // 在jsx中使用单引号代替双引号  默认值false
	// "quoteProps": "as-needed",
};
