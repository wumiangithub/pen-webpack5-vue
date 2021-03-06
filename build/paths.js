const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const moduleFileExtensions = [
	// 'web.mjs',
	// 'mjs',
	// 'web.js',
	'js',
	// 'web.ts',
	'ts',
	// 'web.tsx',
	'tsx',
	'json',
	// 'web.jsx',
	'jsx',
];
// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
	const extension = moduleFileExtensions.find(extension => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

	if (extension) {
		return resolveFn(`${filePath}.${extension}`);
	}

	return resolveFn(`${filePath}.js`);
};

const pathUrl = {
	dotenv: resolveApp('.env'),
	appIndexJs: resolveModule(resolveApp, 'src/main'),
	appHtml: resolveApp('public/index.html'),
	appBuild: resolveApp('dist'),
	appSrc: resolveApp('src'),
	appPenLib: resolveApp('src/pen-lib'),
};
module.exports = pathUrl;
