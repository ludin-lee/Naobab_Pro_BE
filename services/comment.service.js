const CommentRepository = require('../repositories/comment.repository');
const PostRepository = require('../repositories/post.repository');
const { Comments, Posts } = require('../models');
const {
  ValidationError,
  AuthorizationError,
} = require('../exceptions/index.exception');

class CommentService {
  commentRepository = new CommentRepository(Comments);
  postRepository = new PostRepository(Posts);

  createComment = async (comment, userId, postId) => {
    if (!comment) throw new ValidationError('내용을 입력해주세요');

    const post = await this.postRepository.findDetailPost(postId);
    if (!post) throw new ValidationError('존재하지 않는 글입니다.');

    await this.commentRepository.createComment(comment, userId, postId);
  };

  findComment = async (postId) => {
    const comments = this.commentRepository.findPostComment(postId);

    return comments;
  };

  updateComment = async (commentId, userId, comment) => {
    const isComment = await this.commentRepository.findOneComment(commentId);

    if (!isComment) throw new ValidationError('존재하지 않는 글입니다.');
    if (isComment.userId !== userId)
      throw new AuthorizationError('권한이 없습니다');
    if (!comment) throw new ValidationError('내용을 입력해주세요');

    await this.commentRepository.updateComment(commentId, comment);
  };

  deleteComment = async (commentId, userId) => {
    const isComment = await this.commentRepository.findOneComment(commentId);

    if (!isComment) throw new ValidationError('존재하지 않는 글입니다.');
    if (isComment.userId !== userId)
      throw new AuthorizationError('권한이 없습니다.');

    await this.commentRepository.deleteComment(commentId);
  };
}

module.exports = CommentService;
