import bluebird from 'bluebird';
import cron from 'node-cron';
import redis from 'redis';

import { Logger } from '../helpers/logger';
import config from './index';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
  url: config.REDISCLOUD_URL,
});

client.on('error', (err: Error) => {
  Logger.error(err);
});

cron.schedule('30 * * * *', () => {
  client.flushdb(() => {
    Logger.info('Cache cleared');
  });
});
client.flushdb(() => {
  Logger.info('Cache cleared');
});

export default client;
