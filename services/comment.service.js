const CommentRepository = require('../repositories/comment.repository');
const PostRepository = require('../repositories/post.repository');
const NotificationsRepository = require('../repositories/notification.repository');
const { Comments, Posts, Notifications } = require('../models');
const {
  ValidationError,
  AuthorizationError,
} = require('../exceptions/index.exception');

class CommentService {
  commentRepository = new CommentRepository(Comments);
  postRepository = new PostRepository(Posts);
  notificationsRepository = new NotificationsRepository(Notifications);
  //댓글 생성하기
  createComment = async (comment, userId, postId) => {
    if (!comment) throw new ValidationError('내용을 입력해주세요');

    const post = await this.postRepository.findDetailPost(postId);
    if (!post) throw new ValidationError('존재하지 않는 글입니다.');

    await this.commentRepository.createComment(comment, userId, postId);

    if (userId !== post.userId)
      await this.notificationsRepository.createCommentsNotification(
        3,
        post.userId,
        userId,
        post.diaryId,
        postId,
        comment,
      );
  };

  //댓글 조회하기
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
