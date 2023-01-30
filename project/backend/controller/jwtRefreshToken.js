const jwt = require('./jwt');
// const dotenv = require('dotenv');

module.exports = {
  tokenRefreshCheck: async (req, res) => {
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
          const access_payload = {
            id: payload.payload.id,
            phone: payload.payload.phone,
            email: payload.payload.email,
            pwd: payload.payload.pwd,
          };
          const accessToken = jwt.sign(access_payload);
          res.send({ accessToken: accessToken });
        }
      }
    } catch (err) {
      console.log('JWT Refresh Token Error', err);
    }
  },
};
