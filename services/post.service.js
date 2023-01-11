const PostRepository = require('../repositories/post.repository');
const DiaryRepository = require('../repositories/diary.repository');
const BookmarkRepository = require('../repositories/bookmark.repository');
const CommentsRepository = require('../repositories/comment.repository');

const {
  Posts,
  Diaries,
  Bookmark_post,
  Bookmark_diary,
  Comments,
} = require('../models');

const {
  ValidationError,
  NotFoundError,
  AuthorizationError,
} = require('../exceptions/index.exception');

class PostService {
  postRepository = new PostRepository(Posts);
  diaryRepository = new DiaryRepository(Diaries);
  bookmarkRepository = new BookmarkRepository(Bookmark_diary, Bookmark_post);
  commentsRepository = new CommentsRepository(Comments);
  //일기장 생성
  createPost = async (userId, diaryId, title, image, content, weather, tag) => {
    if (!title || !content)
      throw new ValidationError('필수 항목을 작성해주세요');

    const diary = await this.diaryRepository.exDiary(diaryId);

    if (diary.userId !== userId && diary.invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    await this.postRepository.createPost(
      userId,
      diaryId,
      title,
      image,
      content,
      weather,
      tag,
    );
  };

  //일기장 전체 조회
  findPost = async (diaryId, userId) => {
    const post = await this.postRepository.findPost(diaryId);

    if (!post.length) throw new NotFoundError('일기장이 존재하지 않습니다.');

    const diary = await this.diaryRepository.exDiary(diaryId);

    if (diary.userId !== userId && diary.invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    for (let i in post) {
      let bookmark = await this.bookmarkRepository.findPostBookmark(
        post[i].postId,
        userId,
      );
      if (!bookmark) post[i].bookmark = false;
      else post[i].bookmark = true;

      post[i].insideColor = diary.insideColor;
    }
    return post;
  };

  //일기장 상세 조회
  findDetailPost = async (postId, userId) => {
    const post = await this.postRepository.findDetailPost(postId);
    if (!post) throw new NotFoundError('일기장이 존재하지 않습니다.');
    const diary = await this.diaryRepository.exDiary(post.diaryId);

    if (diary.userId !== userId && diary.invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    const bookmark = await this.bookmarkRepository.findPostBookmark(
      post.postId,
      userId,
    );

    if (!bookmark) post.bookmark = false;
    else post.bookmark = true;

    post.comments = await this.commentsRepository.findPostComment(post.postId);

    return post;
  };

  //일기장 수정
  patchPost = async (userId, postId, title, image, content, weather, tag) => {
    const post = await this.postRepository.findDetailPost(postId);

    if (!post) throw new NotFoundError('일기장이 존재하지 않습니다.');

    if (post.userId !== userId) throw new AuthorizationError('권한이 없습니다');

    if (!title || !content)
      throw new ValidationError('필수 항목을 입력해주세요.');

    await this.postRepository.patchPost(
      userId,
      postId,
      title,
      image,
      content,
      weather,
      tag,
    );
  };

  //일기장 삭제
  deletePost = async (userId, postId) => {
    const post = await this.postRepository.findDetailPost(postId);

    if (!post) throw new NotFoundError('일기장이 존재하지 않습니다.');

    if (post.userId !== userId) throw new AuthorizationError('권한이 없습니다');

    await this.postRepository.deletePost(postId);
  };
}

module.exports = PostService;
