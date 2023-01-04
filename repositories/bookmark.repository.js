const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

class BookmarkRepository {
  constructor(BookmarkDiaryModel, BookmarkPostModel) {
    this.bookmarkDiaryModel = BookmarkDiaryModel;
    this.bookmarkPostModel = BookmarkPostModel;
  }

  findAllDiaryBookmark = async (userId) => {
    return await this.bookmarkDiaryModel.findAll({
      where: { userId },
    });
  };

  findDiaryBookmark = async (diaryId, userId) => {
    return await this.bookmarkDiaryModel.findOne({
      where: { diaryId, userId },
    });
  };

  createDiaryBookmark = async (diaryId, userId) => {
    console.log(diaryId, userId);
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

  findAllPostBookmark = async (diaryId, userId) => {
    const query = `SELECT bookmarkId,Posts.postId,Posts.diaryId,Bookmark_posts.userId,Bookmark_posts.createdAt
                   FROM Bookmark_posts LEFT JOIN Posts
                   ON Bookmark_posts.postId = Posts.postId
                   WHERE Posts.diaryId = ${diaryId} AND Bookmark_posts.userId = ${userId}`;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
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
