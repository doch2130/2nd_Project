const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');

const app = express();

dotenv.config({
  path: './config/.env',
});

app.set('view engine', 'ejs');
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

app.get('/', (req, res) => {
  res.send('data');
});

app.get('*', (req, res) => {
  res.send('주소가 존재하지 않습니다. 다시 한 번 확인해주세요.');
  // res.status(404).render('error/404');
});

app.listen(process.env.PORT, () => {
  console.log(`server open ${process.env.PORT}`);
});
