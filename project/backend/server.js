const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const redis = require('redis');

const app = express();

dotenv.config({
  path: './config/.env',
});

//* Redis 연결
// redis[s]://[[username][:password]@][host][:port][/db-number]
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true, // 반드시 설정 !! 설정 안하면 connect-redis 동작 안함
});

redisClient.on('connect', () => {
  console.info('Redis connected!');
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4; // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용

// app.set('view engine', 'ejs');
// app.use('/static', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(
  session({
    // 임의의 문자열을 가지고 세션을 암호화를 하겠다.
    secret: '1234',
    // true 일 경우 모든 요청마다 세션에 변화가 없어도 세션을 다시 저장한다. / 대부분 false로 사용한다.
    resave: false,
    // 초기화되지 않은 세션을 저장할지 선택한다. / 대부분 true로 사용한다.
    saveUninitialized: true,
    // eslint-disable-next-line comma-dangle
  })
);

const router = require('./routes');

app.use('/', router);

app.get('*', (req, res) => {
  res.send('주소가 존재하지 않습니다. 다시 한 번 확인해주세요.');
  // res.status(404).render('error/404');
});

app.listen(process.env.PORT, () => {
  console.log(`server open ${process.env.PORT}`);
});
