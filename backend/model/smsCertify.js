/* eslint-disable arrow-body-style */
const SMSCertify = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'smsCertify',
    {
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      smscode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: 'smsCertify',
      freezeTableName: true,
      timestamps: false,
      // eslint-disable-next-line comma-dangle
    }
  );
};

// eslint-disable-next-line no-unused-vars
SMSCertify.associate = (models) => {
  // Users안에 있는 "id값"을 "user_id라는 컬럼 이름"으로 LikeSing 새로운 컬럼으로 추가한다.
  // User.hasMany(models.LikeSing, {foreignKey: "user_id", sourceKey: 'id'});
  // Users안에 있는 "id값"을 "user_id라는 컬럼 이름"으로 Board 새로운 컬럼으로 추가한다.
  // User.hasMany(models.Board, {foreignKey: "user_id", sourceKey: 'id'});
};

module.exports = SMSCertify;
