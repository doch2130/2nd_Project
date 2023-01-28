const User = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      pwd: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      phonecertifi: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      privacy: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaulteValue: '0',
      },
    },
    {
      tableName: 'user',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

User.associate = (models) => {
  // Users안에 있는 "id값"을 "user_id라는 컬럼 이름"으로 LikeSing 새로운 컬럼으로 추가한다.
  // User.hasMany(models.LikeSing, {foreignKey: "user_id", sourceKey: 'id'});
  // Users안에 있는 "id값"을 "user_id라는 컬럼 이름"으로 Board 새로운 컬럼으로 추가한다.
  // User.hasMany(models.Board, {foreignKey: "user_id", sourceKey: 'id'});
};

module.exports = User;
