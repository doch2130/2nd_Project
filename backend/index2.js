const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { redisClient } = require('./redis/redis');
const { sequelize } = require('./model/index');

dotenv.config({
  path: './config/.env',
});

redisClient.on('connect', () => {
  console.info('Redis connected!');
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

sequelize
  .sync({ force: false }) // 서버 실행시 MySQL 과 연동되도록 하는 sync 메서드
  // force : true 로 해놓으면 서버 재시작마다 테이블이 재생성됨. 테이블을 잘못 만든 경우에 true 로 설정
  .then(() => {
    console.log('MySQL 데이터 베이스 연결 성공');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: [
      process.env.LOCAL_HOST,
      process.env.NAVER_HOST,
      process.env.AWS_HOST,
    ],
    credentials: true,
    // eslint-disable-next-line comma-dangle
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

app.get('*', (req, res) => {
  res.status(404).send('주소가 존재하지 않습니다. 다시 한 번 확인해주세요.');
  // res.status(404).render('error/404');
});

// 에러 미들웨어 테스트 해보기
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log('error middleware: ', err);
  // res.status(500).render('error/500');
  res
    .status(500)
    .send('서버에 일시적인 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
});

app.listen(process.env.PORT, () => {
  console.log(`server open ${process.env.PORT}`);
});
