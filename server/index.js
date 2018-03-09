import express from 'express'
import bodyParser from 'body-parser'
import log4js from 'log4js'
import cors from 'cors'
import config from 'config'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectRedis from 'connect-redis'
import compress from 'compression'
import routers from './routers'
/* eslint-disable no-unused-vars */
import db from './models';
import { http_log, logger } from './common/logger'
import errorhandler from 'errorhandler'
import auth from './middlewares/auth'
console.log('config', config)

const app = express()

app.use(cors())
// // logger
app.use(log4js.connectLogger(logger('http'), { level: 'info' }))

// application/json
app.use(bodyParser.json({ limit: '1mb' }))

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))

app.use(http_log)
// cookie
app.use(cookieParser(config.session_secret))

app.use(compress())

app.use(auth.authUser)

const RedisStore = connectRedis(session)

app.use(
  session({
    secret: config.session_secret,
    store: new RedisStore(config.redis),
    resave: true,
    saveUninitialized: false
  })
)

app.use('/', routers)

// 404
app.use((req, res, next) => {
  res.status(404).send(404)
})
// error handler
if (config.debug) {
  app.use(errorhandler())
} else {
  // 500
  app.use((err, req, res, next) => {
    logger('error').error('throw error:', err)

    const status = err.statusCode || err.status || 500

    res.status(status).json({ message: new Error(err).message })
  })
}

process.on('unhandledRejection', err => {
  logger('error').error('throw error:', err)
})

const port = process.env.HTTP_PORT || config.port

app.listen(port, () => {
  logger('http').info(`${config.name} listening on port`, config.port)
  logger('http').info(`God bless love....`)
  logger('http').info(`You can debug your app with
   http://${config.host}:${config.port}`)
  logger('http').info(``)
})
