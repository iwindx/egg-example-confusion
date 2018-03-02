import express from 'express';
import auth from './middlewares/auth';

const routers = express.Router();

routers.get('/', (req, res, next) => {
  // console.log(req.session);
  return res.end('hello, word!');
});
routers.get('/session', auth.authUser, auth.tokenCheck, (req, res, next) => {
  // console.log('req.session', req.session);
  return res.json(req.session.user);
});
routers.get('/api/login/:code', auth.login);

export default routers;
