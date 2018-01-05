import router from 'koa-router';
import auth from './middlewares/auth';

const routers = new router();

routers.get('/', (ctx, next) => {
  ctx.body = 'hello world!'
});
routers.get('/api/login/:code', auth.login);

export default routers;