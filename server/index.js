import Koa from 'koa';
import path from 'path';
import bodyParser from 'koa-bodyparser';
import log4js from 'log4js';
import cors from 'koa-cors';
import routers from './routers';
import mylog from './middlewares/mylog';
import config from 'config';
import mount from 'koa-mount';
import db from './schemas/db';
import hooks from './middlewares/hook';
import message from './middlewares/message';
import session from 'koa-session2';
import store from './middlewares/store';
const app = new Koa();

console.log('config', config);
mylog.init();
// 跨域
app.use(cors());

// application/json
app.use(bodyParser());

// 日志
app.use(mylog.input);
// redis持久化session
if (config.use_redis) {
  app.use(
    session({
      key: config.auth_cookie_name,
      store: new store(),
      domain: config.domain,
      maxAge: 1000 * 60 * 60 * 24 * 5
    })
  );
} else {
  app.use(session());
}

app.use(routers.routes());

hooks.createHook();

message.init();

app.use(async ctx => {
  ctx.status = 404;
  return (ctx.body = '404');
});

app.on('error', async (err, ctx) => {
  const logger = log4js.getLogger('rule-error');
  logger.info('throw error :', err);
});

const port = process.env.HTTP_PORT || config.port;

app.listen(port, () => {
  console.log(`Server listen on ${port}`);
});
