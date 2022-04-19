const fs = require('fs')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const paths = require('./paths')

/* 
NODE_ENV  只有可能是development,和production
如果要区分不同的应用，需要通过NODE_ENV_APP去配置
这个值可以通过cross-env在package.json中去配置
*/
const NODE_ENV = process.env.NODE_ENV || 'production'
const APP_ENV = process.env.APP_ENV || 'app'

if (!NODE_ENV) {
  throw new Error('NODE_ENV环境变量是必需的，但未指定.')
}

// 读取配置文件配置，从左往右  优先级权重逐渐降低
const dotenvFiles = [
  NODE_ENV == 'development' && `${paths.dotenv}.${APP_ENV}.local`,
  NODE_ENV == 'development' && `${paths.dotenv}.${NODE_ENV}.local`,
  NODE_ENV == 'development' && `${paths.dotenv}.local`,
  `${paths.dotenv}.${APP_ENV}`,
  `${paths.dotenv}.${NODE_ENV}`,
  paths.dotenv,
].filter(Boolean)

console.log('本地化部署====', NODE_ENV, APP_ENV, dotenvFiles)

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    const dotenvConfig = dotenv.config({
      path: dotenvFile,
    })
    dotenvExpand.expand(dotenvConfig) //解析dotenvConfig中的变量
  }
})

exports.getClientEnvironment = (publicUrl) => {
  // const REACT_APP = /^REACT_APP_/i
  const REACT_APP = /^APP_/i
  const raw = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key]
        return env
      },
      {
        // NODE_ENV: process.env.NODE_ENV || 'production',
        // PUBLIC_URL: publicUrl,
      }
    )
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key])
      return env
    }, {}),
  }
  return { raw, stringified }
}
