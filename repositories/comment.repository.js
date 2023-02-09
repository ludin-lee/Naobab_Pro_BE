const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
class CommentRepository {
  constructor(CommentsModel) {
    this.commentsModel = CommentsModel;
  }
  //댓글 생성하기
  createComment = async (comment, userId, postId) => {
    await this.commentsModel.create({
      comment,
      userId,
      postId,
    });
  };
  //댓글 조회
  findPostComment = async (postId) => {
    const query = `SELECT commentId,postId,comment,Comments.createdAt,Comments.updatedAt,Users.nickname,Users.profileImg
    FROM Comments
    LEFT JOIN Users
    On Comments.userId = Users.userId
    WHERE Comments.postId = ${postId}`;

    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return queryResult;
  };

  //댓글 단일조회하기
  findOneComment = async (commentId) => {
    return await this.commentsModel.findOne({
      where: { commentId },
    });
  };

  //댓글 수정하기
  updateComment = async (commentId, comment) => {
    await this.commentsModel.update({ comment }, { where: { commentId } });
  };

  //댓글 삭제하기
  deleteComment = async (commentId) => {
    await this.commentsModel.destroy({
      where: { commentId },
    });
  };
}

module.exports = CommentRepository;
