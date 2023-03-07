const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

dotenv.config({
  path: './config/.env',
});

module.exports = {
  // 토큰 생성
  sign: async (user) => {
    const result = {
      accessToken: jwt.sign(
        {
          id: user.id,
          phone: user.phone,
          email: user.email,
          // pwd는 일단 넣고 나중에 빼는 걸로
          pwd: user.pwd,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          // 만료시간
          expiresIn: '5m',
          // 발행자
          issuer: process.env.JWT_ISSUER,
          // 해싱 알고리즘
          algorithm: process.env.JWT_ALGORITHM,
          // eslint-disable-next-line comma-dangle
        }
      ),
      refreshToken: jwt.sign(
        {
          id: user.id,
          phone: user.phone,
          email: user.email,
          // pwd는 일단 넣고 나중에 빼는 걸로
          pwd: user.pwd,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          // 만료시간
          expiresIn: '14 days',
          // expiresIn: '14',
          // 발행자
          issuer: process.env.JWT_ISSUER,
          // 해싱 알고리즘
          algorithm: process.env.JWT_ALGORITHM,
          // eslint-disable-next-line comma-dangle
        }
      ),
    };
    return result;
  },

  // 토큰 검증
  vertify: async (token, value) => {
    let decodedToken = null;
    // let secret;

    // eslint-disable-next-line operator-linebreak
    const secret =
      value === 'access'
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET;

    try {
      // decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      decodedToken = jwt.verify(token, secret);
      // console.log('decodedToken', decodedToken);
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      }
      console.log('err', err);
      return TOKEN_INVALID;
    }
    return decodedToken;
  },

  getParsing: async (token) => {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    const result = JSON.parse(payload.toString());
    return result;
  },

  // AccessToken 재발급
  reAccessSign: async (user) => {
    const result = {
      accessToken: jwt.sign(
        {
          id: user.id,
          phone: user.phone,
          email: user.email,
          // pwd는 일단 넣고 나중에 빼는 걸로
          pwd: user.pwd,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          // 만료시간
          expiresIn: '5m',
          // 발행자
          issuer: process.env.JWT_ISSUER,
          // 해싱 알고리즘
          algorithm: process.env.JWT_ALGORITHM,
          // eslint-disable-next-line comma-dangle
        }
      ),
    };
    return result;
  },
};
