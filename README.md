### 安装部署

线上跑的是 [Node.js](https://nodejs.org) v6.11.1, [MongoDB](https://www.mongodb.org) 是 v3.4.7, [Redis](http://redis.io) 是 v3.2.1。

``` bash
1. 安装 `Node.js[必须]` `MongoDB[必须]` `Redis[必须]`
2. 启动 MongoDB 和 Redis
3. `$ npm install` 安装 frames 的依赖包
4.  配置文件使用方式详见 `https://github.com/lorenwest/node-config` 生成环境的配置文件 ~/config/production
5. `$ node app.js`
6. visit `http://localhost:8000`
7. done!
```