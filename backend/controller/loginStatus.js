const { JWToken } = require('../model/index');
const jwt = require('./jwt');

exports.loginStatus = async (req, res) => {
  // console.log('헤더', req.get('Authorization'));
  // console.log('헤더쿠키', req.get('Cookie'));

  // 암호화된 쿠키 가져오는 방법
  const { jsid } = req.signedCookies;
  // console.log('jsidCookie', jsid);

  if (!jsid) {
    console.log('Not_Refresh_Cookie');
    res.clearCookie('jsid');
    res.send({ msg: 'Not_Refresh_Cookie' });
    return;
  }

  const token = await JWToken.findOne({
    where: {
      jwtid: jsid,
    },
  });

  // console.log('test', token.refresh);

  if (!token) {
    console.log('Not Same DB Refresh Token');
    res.clearCookie('jsid');
    res.send({ msg: 'Refresh_Die' });
    return;
  }

  const refreshTokenAuth = await jwt.vertify(token.refresh, 'refresh');
  // console.log(refreshTokenAuth.id);

  if (!refreshTokenAuth.id) {
    console.log('Refresh_Token_Expired');
    await JWToken.destroy({
      where: {
        jwtid: jsid,
      },
    });
    res.clearCookie('jsid');
    res.send({ msg: 'Refresh_Die' });
    return;
  }

  const AccessPayload = {
    id: refreshTokenAuth.id,
    phone: refreshTokenAuth.phone,
    email: refreshTokenAuth.email,
    pwd: refreshTokenAuth.pwd,
  };

  const reAccessToken = await jwt.reAccessSign(AccessPayload);

  // console.log('파싱', jwt.getParsing(token.refresh));

  res.send({
    msg: 'login status success',
    id: refreshTokenAuth.id,
    accessToken: reAccessToken.accessToken,
  });
};
