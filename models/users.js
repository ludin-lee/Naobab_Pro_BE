'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Diaries, { foreignKey: 'userId' });
      this.hasMany(models.Diaries, { foreignKey: 'invitedId' });
      this.hasMany(models.Posts, { foreignKey: 'userId' });
      this.hasMany(models.Comments, { foreignKey: 'userId' });
      this.hasMany(models.Bookmark_diary, { foreignKey: 'userId' });
      this.hasMany(models.Bookmark_post, { foreignKey: 'userId' });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      profileImg: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    },
  );
  return Users;
};
