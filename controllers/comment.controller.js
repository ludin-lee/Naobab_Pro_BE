const CommentService = require('../services/comment.service');
const { SECRET_SUM } = process.env;
class CommentController {
  commentService = new CommentService();

  createComment = async (req, res, next) => {
    const { comment } = req.body;
    const { postId } = req.params;
    const userId = res.locals.userId - SECRET_SUM;

    try {
      await this.commentService.createComment(comment, userId, postId);

      return res.status(201).json({ message: '댓글 추가 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '댓글 추가에 실패하였습니다.',
      });
    }
  };

  findComment = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const comments = await this.commentService.findComment(postId);

      return res.status(201).json({ result: comments });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '댓글 조회에 실패하였습니다.',
      });
    }
  };

  updateComment = async (req, res, next) => {
    const { comment } = req.body;
    const { commentId } = req.params;
    const userId = res.locals.userId - SECRET_SUM;

    try {
      await this.commentService.updateComment(commentId, userId, comment);

      return res.status(201).json({ message: '댓글 수정 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '댓글 수정에 실패하였습니다.',
      });
    }
  };

  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const userId = res.locals.userId - SECRET_SUM;

    try {
      await this.commentService.deleteComment(commentId, userId);

      return res.status(201).json({ message: '댓글 삭제 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '댓글 삭제에 실패하였습니다.',
      });
    }
  };
}

module.exports = CommentController;
