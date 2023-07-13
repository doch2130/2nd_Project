const { PostList } = require('../model/index');
const { redisClient } = require('../redis/redis');
const jwt = require('./jwt');

const redisCli = redisClient;

exports.defaultData = async (req, res, next) => {
  try {
    const result = await PostList.findAll({
      // limit: 5,
      order: [['date', 'DESC']],
    });

    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.testAddData = async (req, res, next) => {
  try {
    console.log('data');
    const data = {
      // number: req.body.number,
      id: req.body.id,
      content: req.body.content,
      filename: req.body.filename,
      // date: req.body.date,
      category: req.body.category,
    };

    const result = await PostList.create(data);

    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.postAdd = async (req, res, ext) => {
  try {
    console.log('req.body ', req.body);
    console.log('req.file ', req.file);

    // 암호화된 쿠키 가져오는 방법
    const { jsid } = req.signedCookies;
    // console.log('jsidCookie', jsid);

    if (!jsid) {
      console.log('Not_Refresh_Cookie');
      res.clearCookie('jsid');
      res.send({ msg: 'Not_Refresh_Cookie' });
      return;
    }

    const token = await redisCli.get(jsid);
    if (!token) {
      console.log('Not Same DB Refresh Token');
      res.clearCookie('jsid');
      res.status(400).send({ msg: 'Refresh_Die' });
      return;
    }

    const refreshTokenAuth = await jwt.vertify(token, 'refresh');

    if (!refreshTokenAuth.id) {
      console.log('Refresh_Token_Expired');
      await redisCli.unlink(jsid);
      res.clearCookie('jsid');
      res.status(400).send({ msg: 'Refresh_Die' });
      return;
    }

    const bodyData = JSON.parse(req.body.data);

    const data = {
      id: refreshTokenAuth.id,
      content: bodyData.content,
      filename: req.file.filename,
      // category: bodyData.category,
      category: '',
    };

    const result = await PostList.create(data);

    res.send(result);
  } catch (err) {
    next(err);
  }
};
