const PostRepository = require('../repositories/post.repository');
const DiaryRepository = require('../repositories/diary.repository');
const { Posts, Diaries } = require('../models');

const {
  ValidationError,
  NotFoundError,
} = require('../exceptions/index.exception');

class PostService {
  constructor() {
    this.PostRepository = new PostRepository(Posts);
    this.diaryRepository = new DiaryRepository(Diaries);
  }
  postRepository = new PostRepository();

  //일기장 생성
  createPost = async (userId, diaryId, title, image, content, weather, tag) => {
    if (!title || !content) throw new ValidationError('일기를 작성해주세요');

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

    if (diary.userId !== userId && invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    return post;
  };

  //일기장 상세 조회
  findDetailPost = async (postId, userId) => {
    const post = await this.postRepository.findDetailPost(postId);

    if (!post) throw new NotFoundError('일기장이 존재하지 않습니다.');

    const diary = await this.diaryRepository.postDiary(postId);

    if (diary.userId !== userId && invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    return post;
  };

  //일기장 수정
  patchPost = async (userId, postId, title, image, content, weather, tag) => {
    const post = await this.postRepository.findDetailPost(postId);

    if (!post) throw new NotFoundError('일기장이 존재하지 않습니다.');

    if (post.userId !== userId) throw new AuthorizationError('권한이 없습니다');

    if (!title || !content || !tag)
      throw new ValidationError('모든 항목을 입력해주세요.');

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
