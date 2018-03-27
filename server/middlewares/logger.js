import path from 'path'
import fs from 'fs'
import log4js from 'log4js'
import mkdirp from 'mkdirp'

export const logger = value => {
  // 验证log是否存在
  const exists = fs.existsSync(`log`)

  if (!exists) mkdirp.sync(`log`)

  const address = path.join(__dirname, '../../config/log4js_config.json')

  log4js.configure(address)

  return log4js.getLogger(value)
}

export const http_log = (req, res, next) => {
  const t = new Date()

  logger('http').info('\n\nStarted', req.method, req.url, req.ip)

  res.on('finish', () => {
    const duration = new Date() - t

    logger('http').info('Completed', res.statusCode, `(${duration}) ms`)
  })

  next()
}
