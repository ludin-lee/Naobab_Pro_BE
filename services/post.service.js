const PostRepository = require('../repositories/post.repository');
const { Posts } = require('../models');

const {
  BadRequestError,
  NotFoundError,
} = require('../exceptions/index.exception');

class PostService {
  constructor() {
    this.PostRepository = new PostRepository(Posts);
  }
  postRepository = new PostRepository();

  //일기장 생성
  createPost = async (userId, diaryId, title, image, content, weather, tag) => {
    if (!title || !content) {
      throw new BadRequestError('일기를 작성해주세요');
    }
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
  findPost = async (diaryId) => {
    const post = await this.postRepository.findPost(diaryId);
    if (!post) {
      throw new NotFoundError('일기장이 존재하지 않습니다.');
    }
    return post;
  };

  // //일기장 상세 조회
  // findDetailPost = async (postId) => {
  //   const findOnePost = await this.postRepository.findDetailPost(postId);
  //   return findOnePost;
  // };

  //일기장 수정
  patchPost = async (userId, postId, title, image, content, weather, tag) => {
    const updatePost = await this.postRepository.patchPost(
      userId,
      postId,
      title,
      image,
      content,
      weather,
      tag,
    );
    return updatePost;
  };

  //일기장 삭제
  deletePost = async (userId, postId) => {
    // const isExistPost = await this.postRepository.findDetailPost({
    //   postId,
    // });
    // if ( userId !== isExistPost.userId )
    // if (!isExistPost) {
    //   throw new NotFoundError('일기장이 존재하지 않습니다.');
    // } else {
    //   if (isExistPost) {
    return await this.postRepository.deletePost(postId);
    //     } else {
    //       throw new BadRequestError('일기장을 삭제할 수 없습니다.');
    //     }
    //   }
  };
}

module.exports = PostService;
