const jwt = require('../jwt');
// const dotenv = require('dotenv');

// 안쓸거 같긴 한데 참고용으로 볼 수 있으니 일단 냅둔다.

module.exports = {
  tokenRefreshCheck: async (req, res, next) => {
    try {
      const refreshToken = req.get('Authorization');

      console.log('refreshToken', refreshToken);

      if (refreshToken === 'null' || refreshToken === '') {
        res.send('Not Found RefreshToken');
      } else {
        const authJwt = await jwt.vertify(refreshToken, 'refresh');

        if (authJwt) {
          const payload = jwt.getParsing(refreshToken);
          console.log('payload', payload);
          const accessPayload = {
            id: payload.payload.id,
            phone: payload.payload.phone,
            email: payload.payload.email,
            pwd: payload.payload.pwd,
          };
          const accessToken = jwt.sign(accessPayload);
          res.send({ accessToken });
        }
      }
    } catch (err) {
      console.log('JWT Refresh Token Error');
      next(err);
    }
  },
};
