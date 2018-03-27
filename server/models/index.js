import mongoose from 'mongoose'
import config from 'config'
import { logger } from '../middlewares/logger'
import User from './user'
import bluebird from 'bluebird'

mongoose.Promise = bluebird

const options = {
  poolSize: 10
}

mongoose.connect(config.mongo.url, options, (err, res) => {
  if (err) {
    logger('mongoose').error(
      '[mongoose log] Error connecting to: ',
      `${config.mongo.url}. ${err}`
    )
  }

  return logger('mongoose').info(
    '[mongoose log] Successfully connected to: ',
    config.mongo.url
  )
})
const db = mongoose.connection

db.on('error', () => logger('mongoose').error('mongoose connection error:'))

db.once('open', () => {
  return logger('mongoose').info('mongoose open success')
})

exports.User = User
