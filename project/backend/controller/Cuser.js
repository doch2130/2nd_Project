const { User } = require('../model/index');
const { Op } = require('sequelize');
const { redisClient } = require('../redis/redis');
const { sendVerificationSMS } = require('../controller/naverSensUtill');
const hash = require('./hash');
// const jwt = require('jsonwebtoken');
const jwt = require('./jwt');

const cookieOption = {
  httpOnly: true,
  secure: false,
  maxAge: 1000 * 60 * 60 * 24 * 14,
  signed: true,
};

// v4 버전부터 Promise 기능이 기본이라고 설명서에는 나와있지만
// 현재 Node Project에서는 기능이 Promise 기능이 안된다.
// ps. redisCli.v4.set 방식으로 사용해야 v4 버전에 해당한다.
// ps2. redisCli = .v4로 적용했는데도 안되는걸로 봐서는 안되는 것 같다.
const redisCli = redisClient.v4;

// 문자인증 요청
exports.registerCertification = async (req, res) => {
  // console.log('req.body.phone', req.body.phone);

  const resultPhone = await User.findOne({
    where: { phone: req.body.phone },
  });

  if (resultPhone) {
    res.send('already_join_phone');
  } else {
    const vertificationCode = await sendVerificationSMS(req.body.phone);
    redisCli.set(req.body.phone, vertificationCode);
    redisCli.expire(req.body.phone, 300);

    res.send(true);
  }
};

// 문자인증 검증
exports.registerCertificationCheck = async (req, res) => {
  redisCli.get(req.body.phone, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
};

// 회원가입 기능
exports.register = async (req, res) => {
  // console.log(req.body);

  // OR로 하면 어느것이 중복인지 확인이 불가능해서 따로 find를 실행한다.
  const resultID = await User.findOne({
    where: { id: req.body.id },
  });

  const resultPhone = await User.findOne({
    where: { phone: req.body.phone },
  });

  const resultEmail = await User.findOne({
    where: { email: req.body.email },
  });

  if (resultID) {
    res.send('id_duplicate');
  } else if (resultPhone) {
    res.send('phone_duplicate');
  } else if (resultEmail) {
    res.send('email_duplicate');
  } else {
    // crypto로 비밀번호 암호화
    const { password, salt } = await hash.createHashedPassword(req.body.pwd);

    const data = {
      id: req.body.id,
      name: req.body.name,
      pwd: password,
      phone: req.body.phone,
      phonecertifi: '1',
      email: req.body.email,
      privacy: '1',
      pwsalt: salt,
    };

    const result = await User.create(data);
    // console.log(result);
    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  }
};

// 로그인 기능
exports.login = async (req, res) => {
  const password = await hash.makePasswordHashed(req.body.id, req.body.pwd);

  if (password === 'notFound') {
    res.send(false);
  } else {
    let result = await User.findOne({
      where: {
        [Op.and]: [
          { pwd: password },
          {
            [Op.or]: [
              { id: req.body.id },
              { phone: req.body.id },
              { email: req.body.id },
            ],
          },
        ],
      },
    });
    // console.log(result);

    if (result) {
      // console.log(req.session);
      // console.log('req.session.id', req.session.id);
      const jwtToken = await jwt.sign(result);

      res.cookie('token', jwtToken, cookieOption);
      res.cookie('count', 1, cookieOption);
      res.send({
        msg: true,
        accessToken: jwtToken.accessToken,
        refreshToken: jwtToken.refreshToken,
      });
    } else {
      res.send(false);
    }
  }
};

// // 로그인 기능
// exports.login = async (req, res) => {
//   const password = await hash.makePasswordHashed(req.body.id, req.body.pwd);

//   if (password === 'notFound') {
//     res.send(false);
//   } else {
//     let result = await User.findOne({
//       where: {
//         [Op.and]: [
//           { pwd: password },
//           {
//             [Op.or]: [
//               { id: req.body.id },
//               { phone: req.body.id },
//               { email: req.body.id },
//             ],
//           },
//         ],
//       },
//     });
//     // console.log(result);

//     if (result) {
//       console.log(req.session);
//       console.log('req.session.id', req.session.id);
//       res.send(true);
//     } else {
//       res.send(false);
//     }
//   }
// };
