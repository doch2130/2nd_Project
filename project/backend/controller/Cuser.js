const { User } = require('../model/index');
const { Op } = require('sequelize');

// 회원가입 기능
exports.register = async (req, res) => {
  // console.log(req.body);

  const data = {
    id: req.body.id,
    name: req.body.name,
    pwd: req.body.pwd,
    phone: req.body.phone,
    phonecertifi: '1',
    email: req.body.email,
    privacy: '1',
  };

  let result = await User.findOne({
    where: { id: req.body.id },
  });
  // console.log(result);

  if (result) {
    // 아이디 중복
    res.send('id_duplicate');
  } else {
    result = await User.findOne({
      where: { email: req.body.email },
    });

    if (result) {
      // 이메일 중복
      res.send('email_duplicate');
    } else {
      result = await User.create(data);
      // console.log(result);
      if (result) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  }
};

// 로그인 기능
exports.login = async (req, res) => {
  let result = await User.findOne({
    where: {
      [Op.and]: [
        { pwd: req.body.pwd },
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
    res.send(true);
  } else {
    res.send(false);
  }
};
