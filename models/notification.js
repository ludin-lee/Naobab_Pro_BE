'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nontifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Diaries, { foreignKey: 'diaryId' });
      this.belongsTo(models.Posts, { foreignKey: 'postId' });
    }
  }
  Nontifications.init(
    {
      nonficationId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      code: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'CASCADE',
      },
      audienceIdId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
      },
      diaryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Diaries',
          key: 'diaryId',
        },
        onDelete: 'CASCADE',
      },
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Posts',
          key: 'postId',
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
      modelName: 'Nontifications',
    },
  );
  return Nontifications;
};
