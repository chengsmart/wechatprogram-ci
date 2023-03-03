## 安装方式
```
npm install --save wechatprogram-ci
```

## 使用方法

使用wechat-ci有两种方式，一种通过命令的方式，类似于webpack, 一种通过代码实例化的方式

### 通过命令使用

```
cross-env appId=xxxx wechat-ci manifest/upload/preview
```
wechat-ci提供的三个方法，分别为`wechat-ci manifest`， `wechat-ci preview`， `wechat-ci upload`,可以通过命令的方式传递参数(如传递appid等)


### 通过引用包的方式

```

const wechatCI = new WechatCI({
  sourceManifest: './manifest-config.json',
  destManifest: './manifest.json',
  appid: 'xxx',
});

# 生成uni-app的manifest.json
wecahtCI.manifest();
```

### npm 如何引用本地包

要引用组件我们通常通过`npm install`命令引入，但是如果本地组件未发布到仓库中，那么我们`npm install`将报包找不到的错误,

如果我们需要引入本地包，可以使用类似`npm install --save ..`这个命令来引入本地包

## 配置参数

wechat-ci拥有如下配置参数:

```
{
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
  desc: process.env.dest || '',

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

  // ignores
  ignores: ['node_modules/**/*'],
}
```