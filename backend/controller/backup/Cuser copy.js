const { Op } = require('sequelize');
const { User, JWToken } = require('../../model/index');

const { redisClient } = require('../../redis/redis');
const { sendVerificationSMS } = require('../naverSensUtill');
const hash = require('../hash');
const jwt = require('../jwt');

// v4 버전부터 Promise 기능이 기본이라고 설명서에는 나와있지만
// 현재 Node Project에서는 기능이 Promise 기능이 안된다.
// ps. redisCli.v4.set 방식으로 사용해야 v4 버전에 해당한다.
// ps2. redisCli = .v4로 적용했는데도 안되는걸로 봐서는 안되는 것 같다.
// const redisCli = redisClient.v4;
const redisCli = redisClient;

// console.log('redisCli', redisClient.v4);

// 회원탈퇴
exports.unRegister = async (req, res, next) => {
  try {
    const refreshTokenId = req.signedCookies.jsid;

    if (refreshTokenId) {
      await JWToken.destroy({
        where: {
          jwtid: refreshTokenId,
        },
      });
    }

    const result = await User.destroy({
      where: {
        id: req.body.id,
      },
    });

    if (result) {
      res.clearCookie('jsid');
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    next(err);
  }
};

// 로그아웃
exports.logout = async (req, res, next) => {
  try {
    const refreshTokenId = req.signedCookies.jsid;

    if (refreshTokenId) {
      await JWToken.destroy({
        where: {
          jwtid: refreshTokenId,
        },
      });
    }

    res.clearCookie('jsid');
    res.send(true);
  } catch (err) {
    next(err);
  }
};

// 문자인증 요청
exports.registerCertification = async (req, res, next) => {
  try {
    const vertificationCode = await sendVerificationSMS(req.body.phone);
    console.log('req.body.phone', req.body.phone);
    redisCli.set(req.body.phone, vertificationCode);
    // redisCli.set('01091925745', '123458');
    redisCli.expire(req.body.phone, 300);
    res.send(true);
  } catch (err) {
    // console.log('err', err);
    next(err);
  }
};

// 문자인증 검증
exports.registerCertificationCheck = async (req, res, next) => {
  try {
    redisCli.get(req.body.phone, (err, result) => {
      if (err) throw err;

      console.log('result', result);
      console.log('result', typeof result);
      res.send(result);
    });
  } catch (err) {
    // console.log('err', err);
    next(err);
  }
};

// 회원가입 기능
exports.register = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// 로그인 기능
exports.login = async (req, res, next) => {
  try {
    const password = await hash.makePasswordHashed(req.body.id, req.body.pwd);

    if (password === 'notFound') {
      res.send(false);
    } else {
      const result = await User.findOne({
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
        // 로그인 성공 시 JWT Token 생성
        const jwtToken = await jwt.sign(result);
        const jwtid = await hash.createRefreshToken(result.id);

        // console.log('jwtid', jwtid);
        // console.log('refresh', jwtToken);

        // jwtid, refreshToken DB에 저장
        await JWToken.create({
          jwtid,
          refresh: jwtToken.refreshToken,
        });

        // 로그인 정보 저장 쿠키를 전달
        if (req.body.loginCookie) {
          res.cookie('loginid', req.body.id, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            // eslint-disable-next-line comma-dangle
          });
        }

        const cookieOption = {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 14,
          signed: true,
        };

        // 임시 Refresh Token의 ID를 쿠키로 전달
        res.cookie('jsid', jwtid, cookieOption);
        // Access Token은 데이터로 전달 후 클라이언트에서 Header['Authorization']에 적용 처리
        // 이후 클라이언트에서 요청 시 Header에 Access Token을 같이 보내주게 된다.
        res.send({
          msg: true,
          id: result.id,
          accessToken: jwtToken.accessToken,
        });
      } else {
        res.send(false);
      }
    }
  } catch (err) {
    next(err);
  }
};

async function refreshTokenCheck(refreshTokenId) {
  const token = await JWToken.findOne({
    where: {
      jwtid: refreshTokenId,
    },
  });

  console.log('refreshTokenCheck', token);

  const refreshTokenAuth = await jwt.vertify(token.refresh, 'refresh');
  console.log(refreshTokenAuth);

  if (!refreshTokenAuth.id) {
    console.log('Refresh_Token_Expired');
    await JWToken.destroy({
      where: {
        jwtid: refreshTokenId,
      },
    });
    return { msg: 'Refresh Expired' };
  }

  const AccessPayload = {
    id: refreshTokenAuth.id,
    phone: refreshTokenAuth.phone,
    email: refreshTokenAuth.email,
    pwd: refreshTokenAuth.pwd,
  };

  const reAccessToken = await jwt.reAccessSign(AccessPayload);
  return {
    reAccessToken: reAccessToken.accessToken,
    msg: 'Token ReCreate Success',
  };
}

// tokenAuth 검사
exports.tokenAuth = async (req, res, next) => {
  try {
    const accessToken = req.get('Authorization').slice(7);
    console.log('AccessToken', accessToken);

    const { jsid } = req.signedCookies;
    console.log('jsidCookie', jsid);

    if (accessToken) {
      const accessTokenAuth = await jwt.vertify(accessToken, 'access');

      if (accessTokenAuth === -2) {
        console.log('AccessToken Invalid');
        res.send({ msg: 'AccessToken Invalid' });
      } else if (accessTokenAuth === -3) {
        console.log('AccessToken Expired');
        // Refresh Token 검사
        if (jsid) {
          const refreshTokenAuth = await refreshTokenCheck(jsid);
          console.log('refreshTokenAuth', refreshTokenAuth);
          if (refreshTokenAuth.msg === 'Refresh Expired') {
            console.log('Access Expired, Refresh Expired');
            res.send({ msg: 'Access, Refresh NotFound' });
          } else if (refreshTokenAuth.reAccessToken) {
            console.log('Access Expired => ReCreate');
            res.send({
              accessToken: refreshTokenAuth.reAccessToken,
              msg: 'Access Token Success',
            });
          } else {
            res.status(500).send({ msg: 'error' });
          }
        } else {
          console.log('Access Expired, Refresh NotFound');
          res.send({ msg: 'Access, Refresh NotFound' });
        }
      } else {
        // Access Token 정상인 경우
        console.log('Access Token Excellent');
        res.send({ msg: 'Access Token Excellent' });
      }
    } else {
      console.log('AccessToken Undefined');
      // Refresh Token 검사
      if (jsid) {
        const refreshTokenAuth = await refreshTokenCheck(jsid);
        console.log('refreshTokenAuth', refreshTokenAuth);
        if (refreshTokenAuth.msg === 'Refresh Expired') {
          console.log('Access Undefined, Refresh Expired');
          res.send({ msg: 'Access, Refresh NotFound' });
        } else if (refreshTokenAuth.reAccessToken) {
          console.log('Access Undefined => ReCreate');
          res.send({
            accessToken: refreshTokenAuth.reAccessToken,
            msg: 'Access Token Success',
          });
        } else {
          res.status(500).send({ msg: 'error' });
        }
      } else {
        console.log('Access, Refresh NotFound');
        res.send({ msg: 'Access, Refresh NotFound' });
      }
    }
  } catch (err) {
    next(err);
  }
};
