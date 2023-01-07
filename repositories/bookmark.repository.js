const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

class BookmarkRepository {
  constructor(BookmarkDiaryModel, BookmarkPostModel) {
    this.bookmarkDiaryModel = BookmarkDiaryModel;
    this.bookmarkPostModel = BookmarkPostModel;
  }

  findDiaryBookmark = async (diaryId, userId) => {
    return await this.bookmarkDiaryModel.findOne({
      where: { diaryId, userId },
    });
  };

  createDiaryBookmark = async (diaryId, userId) => {
    await this.bookmarkDiaryModel.create({
      diaryId,
      userId,
    });
  };

  deleteDiaryBookmark = async (diaryId, userId) => {
    await this.bookmarkDiaryModel.destroy({
      where: { diaryId, userId },
    });
  };

  findPostBookmark = async (postId, userId) => {
    return await this.bookmarkPostModel.findOne({
      where: { postId, userId },
    });
  };

  createPostBookmark = async (postId, userId) => {
    await this.bookmarkPostModel.create({
      postId,
      userId,
    });
  };

  deletePostBookmark = async (postId, userId) => {
    await this.bookmarkPostModel.destroy({
      where: { postId, userId },
    });
  };
}

module.exports = BookmarkRepository;
