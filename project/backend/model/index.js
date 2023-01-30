const Sequelize = require('sequelize');
const config = require('../config/config.json')['development'];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// User 테이블
db.User = require('./User')(sequelize, Sequelize);
// JwToken 테이블
db.JWToken = require('./JWToken')(sequelize, Sequelize);

module.exports = db;
