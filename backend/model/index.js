const Sequelize = require('sequelize');
// eslint-disable-next-line dot-notation
const config = require('../config/config.json')['development'];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  // eslint-disable-next-line comma-dangle
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// User 테이블
db.User = require('./User')(sequelize, Sequelize);
// JwToken 테이블
db.JWToken = require('./JwToken')(sequelize, Sequelize);
// SMS 인증 테이블
db.SMSCertify = require('./SmsCertify')(sequelize, Sequelize);
// Post 테이블
db.PostList = require('./PostList')(sequelize, Sequelize);

module.exports = db;
