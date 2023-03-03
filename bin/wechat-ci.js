#!/usr/bin/env node

const { WechatCI } = require('../src/main');

function upload() {
  const wechatCI = new WechatCI();
  wechatCI.upload();
}

function preview() {
  const wechatCI = new WechatCI();
  wechatCI.preview();
}

function manifest() {
  const wechatCI = new WechatCI();
  wechatCI.generateManifest();
}

function run(argv) {
  switch (argv[0]) {
    case 'upload': 
      upload();
      break;
      
    case 'preview':
      preview();
      break;

    case 'manifest':
      manifest();
      break;

    default:
      const colors = require('colors');
      console.log(colors.red('未找到命令!'));
  }
}

run(process.argv.slice(2));