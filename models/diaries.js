'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diaries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.hasMany(models.Posts, { foreignKey: 'diaryId' });
      this.hasMany(models.Bookmark_diary, { foreignKey: 'diaryId' });
      this.hasMany(models.Chats, { foreignKey: 'diaryId' });
      this.hasMany(models.Notifications, { foreignKey: 'diaryId' });
    }
  }
  Diaries.init(
    {
      diaryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      couple: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      diaryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      outsideColor: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'white',
      },
      insideColor: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'white',
      },
      sticker: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      design: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'basic',
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // Users 테이블에
          key: 'userId', // userId column 과 관계를 맺음
        },
        onDelete: 'CASCADE',
      },
      invitedId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // Users 테이블에
          key: 'userId', // userId column 과 관계를 맺음
        },
      },
      invitedSecureId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // Users 테이블에
          key: 'userId', // userId column 과 관계를 맺음
        },
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
      modelName: 'Diaries',
    },
  );
  return Diaries;
};
