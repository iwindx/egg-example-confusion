koa2-frames
=

[![build status][travis-image]][travis-url]
[![codecov.io][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]

[travis-image]: https://img.shields.io/travis/cnodejs/nodeclub/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cnodejs/nodeclub
[codecov-image]: https://img.shields.io/codecov/c/github/cnodejs/nodeclub/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/cnodejs/nodeclub?branch=master
[david-image]: https://img.shields.io/david/cnodejs/nodeclub.svg?style=flat-square
[david-url]: https://david-dm.org/cnodejs/nodeclub
[node-image]: https://img.shields.io/badge/node.js-%3E=_7.8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

### 安装部署

线上跑的是 [Node.js](https://nodejs.org) v7.8.0，[MongoDB](https://www.mongodb.org) 是 v3.4.0。

```
1. 安装 `Node.js[必须]` `MongoDB[必须]` `Redis[非必须]`
2. 启动 MongoDB，有安装Redis请启动
3. `$ npm install` 安装依赖包
4. `default.json5 开发环境的配置文件， production.json5生产环境的配置文件, 生产环境请用pm2 start   pm2/default.json`
5. `$node app.js`
6. visit `http://localhost:5678`
7. done!
```




