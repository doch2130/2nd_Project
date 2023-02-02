const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const { redisClient } = require('./redis/redis');
// const redis = require('redis');
// const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// const path = require('path');

dotenv.config({
  path: './config/.env',
});

//* Redis 연결
// redis[s]://[[username][:password]@][host][:port][/db-number]
// const redisClient = redis.createClient({
//   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
// // 반드시 설정 !! 설정 안하면 connect-redis 동작 안함
//   legacyMode: true,
// });

redisClient.on('connect', () => {
  console.info('Redis connected!');
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// console.log(redisClient);
// redis v4 연결 (비동기)
redisClient.connect();
// .then(async () => {
//   console.log('Redis Connected!');
//   await redisCli.set('phh', '147258');
//   const test = await redisCli.get('phh');
//   console.log(test);
// });
// 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용
// const redisCli = redisClient.v4;

const app = express();

// app.set('view engine', 'ejs');
// app.use('/static', express.static(__dirname + '/public'));
// app.use(
//   cors({
//     origin: ['http://localhost:3000', 'http://115.85.183.140:3000'],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, '../build')));
// app.use(
//   session({
//     secret: '1234',
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.use(cookieParser(process.env.COOKIE_SECRET));

const sessionOption = {
  resave: false,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};
app.use(session(sessionOption));

// redis 세션 시도
// node 연결 시 자동으로 생성되는 sessionID를 redis에 저장하기 때문에 현재 상황에서는 필요하지가 않다.
// 세션 쿠키 미들웨어
// app.use(cookieParser(process.env.COOKIE_SECRET));
// const sessionOption = {
//    resave: false,
//    saveUninitialized: true,
//    secret: process.env.COOKIE_SECRET,
//    cookie: {
//       httpOnly: true,
//       secure: false,
//    },
//    // 세션 데이터를 로컬 서버 메모리가 아닌 redis db에 저장하도록 등록
//    store: new RedisStore({ client: redisClient, prefix: 'session:' }),
// };
// app.use(session(sessionOption));

const router = require('./routes');

app.use('/', router);

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
// });

app.get('*', (req, res) => {
  res.status(404).send('주소가 존재하지 않습니다. 다시 한 번 확인해주세요.');
  // res.status(404).render('error/404');
});

app.listen(process.env.PORT, () => {
  console.log(`server open ${process.env.PORT}`);
});
