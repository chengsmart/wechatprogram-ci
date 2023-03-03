const process = require('process');

module.exports = {
  // appid
  appid: process.env.appId || '',

  // project path
  projectPath: process.env.projectPath || '',

  // privateKeyPath
  privateKeyPath: process.env.privateKeyPath || '',

  // basePath
  basePath: process.cwd() || process.env.pwd || '',

  // 小程序类型， 有【miniProgram, miniProgramPlugin, miniGame, miniGamePlugin】四种类型
  type: process.env.type || 'miniProgram', 

  // 二维码地址
  qrcodePath: process.env.qrcodePath || '',

  // 二维码类型，支持image或者base64格式
  qrcodeFormat: process.env.qrcodeFormat || 'image',

  // 描述
  desc: process.env.desc || '',

  // 名称
  name: process.env.name || '',

  // 源manifest
  sourceManifest: process.env.sourceManifest || '',

  // 目标manifest
  destManifest: process.env.destManifest || '',
  
  // 是否压缩
  minify: true,

  // 是否输出
  debugger: true,

  // 线程数
  threads: 2,

  // 版本
  version: '',
  
  // 机器人id
  robot: process.env.robotId || 15,

  // ignores
  ignores: ['node_modules/**/*'],
}