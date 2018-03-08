import express from 'express';
import auth from './middlewares/auth';
import util from './middlewares/util';

const routers = express.Router();

routers.get('/', (req, res, next) => {
  if (util.checkSignature(req)) {
    res.send(200, req.query.echostr);
  } else {
    res.send(200, 'fail');
  }
});
routers.get('/session', auth.authUser, auth.tokenCheck, (req, res, next) => {
  return res.json(req.session.user);
});
routers.get('/api/login/:code', auth.login);

export default routers;
