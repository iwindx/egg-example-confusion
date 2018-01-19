import log4js from 'log4js';
import path from 'path';
import fs, {mkdir} from 'fs';
import mkdirp from 'mkdirp';

let logger;
export default {
  async exists() {
    const exist = fs.existsSync(`log`);
    if (!exist) return mkdirp.sync(`log`);
    return exist;
  },
  async init() {
    await this.exists();
    let address = path.join(__dirname, './log4js_config.json');
    log4js.configure(address);
    logger = log4js.getLogger('access');
  },
  async input(ctx, next) {
    const user = 'anonymous';
    const ip =
      ctx.request.headers['x-forwarded-for'] ||
      ctx.request.ip ||
      ctx.request._remoteAddress ||
      (ctx.request.socket &&
        (ctx.request.socket.remoteAddress ||
          (ctx.request.socket.socket && ctx.request.socket.socket.remoteAddress)));

    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    const referer = ctx.request.headers['referer'];
    logger.info(
      `${user}@${ip} ${referer || referer || ''}  ${ctx.request.get(
        'User-Agent'
      )} ${ctx.method} ${ctx.url} - ${ms}ms`
    );
  }
};
