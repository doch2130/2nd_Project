const dotenv = require('dotenv');
// eslint-disable-next-line import/no-extraneous-dependencies
const Redis = require('ioredis');

dotenv.config({
  path: './config/.env',
});

// exports.redisClient = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
// });

exports.redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  // password: process.env.REDIS_PASSWORD,
});

// exports.SaveData = async (redisConfig, data) => {
//   const redisClient = redis.createClient(redisConfig);
//   await redisClient.connect();
//   await redisClient.set(data.account, data.token);
//   await redisClient.expireAt(data.account, parseInt(+new Date() / 1000) + 86400);
//   await redisClient.disconnect();
//   console.log(`${data.account}'s token save in Redis`);
// }
