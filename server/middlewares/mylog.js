import log4js from 'log4js';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';

let logger;
export default {
  exists() {
    return new Promise((resolve, reject) => {
      fs.exists(`log`, exists => {
        if (exists) return resolve(exists);

        mkdirp(`log`, err => {
          if (err) return reject(err);

          return resolve(exists);
        });
      });
    });
  },
  async init() {
    await this.exists();
    let address = path.join(__dirname, './log4js_config.json');
    log4js.configure(address);
    logger = log4js.getLogger('access');
  },
  accessLog(ctx, next) {
    let user = 'anonymous';
    let ip;

    ip =
      ctx.request.headers['x-forwarded-for'] ||
      ctx.request.ip ||
      ctx.request._remoteAddress ||
      (ctx.request.socket &&
        (ctx.request.socket.remoteAddress ||
          (ctx.request.socket.socket && ctx.request.socket.socket.remoteAddress)));

    logger.info(
      `${user}@${ip} ${ctx.request.method} ${ctx.request.originalUrl} ${ctx.request.headers[
        'referer'
      ] ||
        ctx.request.headers['referrer'] ||
        ''} \n ${ctx.request.get('User-Agent')}`
    );
    next();
  }
};
