const PostList = ( Sequelize, DataTypes) => {
    return Sequelize.define(
        "postList",
        {
            number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            id: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            filename: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            category: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
        },
        {
            tableName: "postList",
            freezeTableName: true,
            timestamps: false
        },
  )
}
PostList.associate = (models) => {
    // Users안에 있는 "id값"을 "user_id라는 컬럼 이름"으로 LikeSing 새로운 컬럼으로 추가한다.
    // User.hasMany(models.LikeSing, {foreignKey: "user_id", sourceKey: 'id'});
    // Users안에 있는 "id값"을 "user_id라는 컬럼 이름"으로 Board 새로운 컬럼으로 추가한다.
    // User.hasMany(models.Board, {foreignKey: "user_id", sourceKey: 'id'});
  };
  
  module.exports = PostList;
  