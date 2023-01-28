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
