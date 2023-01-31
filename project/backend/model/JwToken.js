const JWToken = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'jwToken',
    {
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      jwtid: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      refresh: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      tableName: 'jwToken',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

JWToken.associate = (models) => {
  // Users안에 있는 "id값"을 "user_id라는 컬럼 이름"으로 LikeSing 새로운 컬럼으로 추가한다.
  // User.hasMany(models.LikeSing, {foreignKey: "user_id", sourceKey: 'id'});
  // Users안에 있는 "id값"을 "user_id라는 컬럼 이름"으로 Board 새로운 컬럼으로 추가한다.
  // User.hasMany(models.Board, {foreignKey: "user_id", sourceKey: 'id'});
};

module.exports = JWToken;
