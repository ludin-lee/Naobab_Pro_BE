const CommentService = require('../services/comment.service');

class CommentController {
  commentService = new CommentService();

  createComment = async (req, res, next) => {
    const { comment } = req.body;
    const { postId } = req.params;
    const userId = res.locals.userId;

    try {
      await this.commentService.createComment(comment, userId, postId);

      return res.status(201).json({ message: '댓글 추가 성공', result: true });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ result: false, message: err.message || 'unknown error' });
    }
  };

  findComment = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const comments = await this.commentService.findComment(postId);

      return res.status(201).json({ result: comments });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ result: false, message: err.message || 'unknown error' });
    }
  };

  updateComment = async (req, res, next) => {
    const { comment } = req.body;
    const { commentId } = req.params;
    const userId = res.locals.userId;
    try {
      await this.commentService.updateComment(commentId, userId, comment);

      return res.status(201).json({ message: '댓글 수정 성공', result: true });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ result: false, message: err.message || 'unknown error' });
    }
  };

  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const userId = res.locals.userId;

    try {
      await this.commentService.deleteComment(commentId, userId);
      return res.status(201).json({ message: '댓글 삭제 성공', result: true });
    } catch (error) {
      return res
        .status(err.status || 500)
        .json({ result: false, message: err.message || 'unknown error' });
    }
  };
}

module.exports = CommentController;
