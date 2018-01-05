import mongoose from 'mongoose';
import config from 'config';

const options = {
  useMongoClient: true,
  poolSize: 5,
};

mongoose.connect(config.mongo.url, options, (err, res) => {
  if (err) {
    console.log('[mongoose log] Error connecting to: ', config.mongo.url + '. ' + err);
    return process.exit(1);
  } else {
    return console.log('[mongoose log] Successfully connected to: ', config.mongo.url);
  }
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongoose connection error:'));

db.once('open', () => {
  return console.log('mongoose open success');
});

mongoose.set('debug', config.mongodb_debug);
