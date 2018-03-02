import mongoose from 'mongoose';
import config from 'config';
import {logger} from '../middlewares/logger';

const options = {
  poolSize: 10
};

mongoose.connect(config.mongo.url, options, (err, res) => {
  if (err) {
    logger('mongoose').error('[mongoose log] Error connecting to: ', config.mongo.url + '. ' + err);
    return process.exit(1);
  } else {
    return logger('mongoose').info('[mongoose log] Successfully connected to: ', config.mongo.url);
  }
});
const db = mongoose.connection;

db.on('error', () => logger('mongoose').error('mongoose connection error:'));

db.once('open', () => {
  return logger('mongoose').info('mongoose open success');
});

if (config.mongodb_debug) {
  const traceMQuery = (method, info, query) => {
    return (err, result, millis) => {
      if (err) {
        logger.error('traceMQuery error:', err);
      }
      let infos = [];
      infos.push(query._collection.collection.name + '.' + method.blue);
      infos.push(JSON.stringify(info));
      infos.push((millis + 'ms').green);

      logger('mongoose').debug('mongoose'.magenta, infos.join(' '));
    };
  };

  mongoose.Mongoose.prototype.mquery.setGlobalTraceFunction(traceMQuery);
}
