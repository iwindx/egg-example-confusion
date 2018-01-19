import router from 'koa-router';
import auth from './middlewares/auth';
import events from './bl/events';
import report from './bl/report';
import store from './middlewares/store';

const routers = new router();

routers.get('/', (ctx, next) => {
  ctx.body = 'hello world!';
});

routers.get('/api/login/:code', auth.login);

routers.post('/api/webhook/callback', events.eventCallBack);

routers.get('/api/report/count', report.count);

routers.get('/api/report/info', report.info);

export default routers;
