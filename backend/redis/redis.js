const dotenv = require('dotenv');
// const redis = require('redis');
// eslint-disable-next-line import/no-extraneous-dependencies
const Redis = require('ioredis');

dotenv.config({
  path: './config/.env',
});

// console.log('t', process.env.REDIS_USERNAME);
// console.log('t', process.env.REDIS_HOST);
// console.log('t', process.env.REDIS_PORT);
// console.log('t', process.env.REDIS_PASSWORD);

// exports.redisClient = redis.createClient({
//   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/1`,
//   // legacyMode 반드시 설정 !! 설정 안하면 connect-redis 동작 안함
//   legacyMode: true,
// });

exports.redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
