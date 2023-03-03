const ci = require('miniprogram-ci');
const DEFAULTS = require('./constant');
const console = require('console');
const path = require('path');
const fs = require('fs');

class WechatCI {
  constructor(options = {}) {
    this.options = this.objectMerge(DEFAULTS, options)

    if (!path.isAbsolute(this.options.projectPath)) {
      this.options.projectPath = path.join(this.options.basePath, this.options.projectPath)
    }
    if (!path.isAbsolute(this.options.privateKeyPath)) {
      this.options.privateKeyPath = path.join(this.options.basePath, this.options.privateKeyPath)
    }
    if (!path.isAbsolute(this.options.qrcodePath)) {
      this.options.qrcodePath = path.join(this.options.basePath, this.options.qrcodePath)
    }

    if (this.options.version === '' && fs.existsSync(path.join(this.options.basePath, 'package.json'))) {
      const packages = require(path.join(this.options.basePath, 'package.json'));
      this.options.version = packages.version;
    }
  }

  // 生成预览版
  preview() {
    if (!this.validateOptions()) {
      return;
    }

    (async() => {
      const project = new ci.Project({
        appid: this.options.appid,
        type: this.options.type,
        projectPath: this.options.projectPath,
        privateKeyPath: this.options.privateKeyPath,
        ignores: this.options.ignores,
      })

      let options = {
        project,
        desc: this.options.desc,
        setting: {
          minify: this.options.minify,
        },
        qrcodeFormat: this.options.qrcodeFormat,
        qrcodeOutputDest: this.options.qrcodePath,
      }

      if (this.options.debugger) {
        options.onProgressUpdate = console.log;
      }
      await ci.preview(options);
    })()
  }

  // 上传
  upload() {
    if (!this.validateOptions()) {
      return;
    }

    (async() => {
      const project = new ci.Project({
        appid: this.options.appid,
        type: this.options.type,
        projectPath: this.options.projectPath,
        privateKeyPath: this.options.privateKeyPath,
        ignores: this.options.ignores,
      })

      let options = {
        project,
        robot: this.options.robot,
        desc: this.options.desc,
        setting: {
          minify: this.options.minify,
        },
        version: this.options.version,
        threads: this.options.threads,
      }

      if (this.options.debugger) {
        options.onProgressUpdate = console.log;
      }

      await ci.upload(options);
    })()
  }

  // 生成manifest
  generateManifest() {
    let sourceManifestPath = this.options.sourceManifest;
    if (!path.isAbsolute(sourceManifestPath)) {
      sourceManifestPath = path.join(this.options.basePath, sourceManifestPath)
    }

    let destManifestPath = this.options.destManifest;
    if (!path.isAbsolute(destManifestPath)) {
      destManifestPath = path.join(this.options.basePath, destManifestPath)
    }

    if (!fs.existsSync(sourceManifestPath)) {
      console.error('未找到source minifest文件');
      return;
    }

    const sourceContent = require(sourceManifestPath)
    sourceContent.versionName = this.options.version
    sourceContent.name = this.options.name
    fs.writeFileSync(destManifestPath, JSON.stringify(sourceContent, null, 4))
  }

  // 检查projectPath跟appid, privateKeyPath是否存在
  validateOptions() {
    if (this.options.appid === '' || this.options.projectPath === '' || this.options.privateKeyPath === '') {
      console.error('配置错误信息错误，请检查appid和privateKey是否有传参');
      return false;
    }
    

    // 检测路径是否存在
    if (!fs.existsSync(this.options.projectPath)) {
      console.error("projectPath 路径未找到")
      return false;
    }

    if (!fs.existsSync(this.options.privateKeyPath)) {
      console.error("privateKeyPath 路径未找到")
      return false;
    }

    return true;
  }

  // 合并object
  objectMerge(target, source) {
    if (typeof target !== 'object') {
      target = {}
    }
    if (Array.isArray(source)) {
      return source.slice()
    }
    Object.keys(source).forEach(property => {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty)
      } else {
        target[property] = sourceProperty
      }
    })
    return target
  }
}

module.exports.WechatCI = WechatCI