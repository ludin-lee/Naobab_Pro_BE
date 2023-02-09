'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Diaries, { foreignKey: 'diaryId' });
      this.hasMany(models.Comments, { foreignKey: 'postId' });
      this.hasMany(models.Bookmark_post, { foreignKey: 'postId' });
      this.hasMany(models.Notifications, { foreignKey: 'postId' });
    }
  }
  Posts.init(
    {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      weather: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: '맑음',
      },
      tag: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      diaryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Diaries',
          key: 'diaryId',
        },
        onDelete: 'CASCADE',
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
      modelName: 'Posts',
    },
  );
  return Posts;
};
