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
const app = new Koa();

mylog.init();

app.use(cors());

// application/json
app.use(bodyParser());

app.use(mylog.accessLog);
app.use(mount('/', routers.routes()));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    logger.error(err.message);
    ctx.body = {
      message: err.message
    };
  }
});

app.listen(config.port, () => {
  console.log(`Server listen on ${config.port}`);
});
