const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
class CommentRepository {
  constructor(CommentsModel) {
    this.commentsModel = CommentsModel;
  }

  createComment = async (comment, userId, postId) => {
    await this.commentsModel.create({
      comment,
      userId,
      postId,
    });
  };

  findPostComment = async (postId) => {
    const query = `SELECT commentId,postId,comment,Comments.createdAt,Comments.updatedAt,Users.nickname
    FROM Comments
    LEFT JOIN Users
    On Comments.userId = Users.userId
    WHERE Comments.postId = ${postId}`;

    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return queryResult;
  };

  findOneComment = async (commentId) => {
    const findOneComment = await this.commentsModel.findOne({
      where: { commentId },
    });
    return findOneComment;
  };

  updateComment = async (commentId, comment) => {
    await this.commentsModel.update({ comment }, { where: { commentId } });
  };

  deleteComment = async (commentId) => {
    await this.commentsModel.destroy({
      where: { commentId },
    });
  };
}

module.exports = CommentRepository;
