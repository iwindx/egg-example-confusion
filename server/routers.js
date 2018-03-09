import express from 'express'
import auth from './middlewares/auth'

const routers = express.Router()

routers.get('/', (req, res, next) => {
  return res.send('hello , world')
})
routers.get('/session', auth.authUser, auth.tokenCheck, (req, res, next) => {
  return res.json(req.session.user)
})
routers.get('/api/login/:code', auth.login)

export default routers
