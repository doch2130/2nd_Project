const dotenv = require('dotenv');
// eslint-disable-next-line import/no-extraneous-dependencies
const Redis = require('ioredis');

dotenv.config({
  path: './config/.env',
});

exports.redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
