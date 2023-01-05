const BookmarkRepository = require('../repositories/bookmark.repository');
// const DiaryRepository = require('../repositories/diary.repository');
// const PostRepository = require('../repositories/post.repository');

const { Bookmark_diary, Bookmark_post, Diary, Post } = require('../models');
const {
  ValidationError,
  AuthorizationError,
} = require('../exceptions/index.exception');

class BookmarkService {
  bookmarkRepository = new BookmarkRepository(Bookmark_diary, Bookmark_post);
  // diaryRepository = new DiaryRepository(Diary);
  // postRepository = new PostRepository(Post);

  findAllDiaryBookmark = async (userId) => {
    return await this.bookmarkRepository.findAllDiaryBookmark(userId);
  };

  findDiaryBookmark = async (diaryId, userId) => {
    return await this.bookmarkRepository.findDiaryBookmark(diaryId, userId);
  };

  createDiaryBookmark = async (diaryId, userId) => {
    // const exDiary = await this.diaryRepository.findDiary(diaryId);
    // if (!exDiary) throw new ValidationError('존재하지 않는 다이어리입니다.');
    // if (exDiary.userId !== userId)
    //   throw new AuthorizationError('권한이 없습니다');

    await this.bookmarkRepository.createDiaryBookmark(diaryId, userId);
  };

  deleteDiaryBookmark = async (diaryId, userId) => {
    // const exDiary = await this.diaryRepository.findDiary(diaryId);
    // if (!exDiary) throw new ValidationError('존재하지 않는 다이어리입니다.');
    // if (exDiary.userId !== userId)
    //   throw new AuthorizationError('권한이 없습니다');
    await this.bookmarkRepository.deleteDiaryBookmark(diaryId, userId);
  };

  findAllPostBookmark = async (diaryId, userId) => {
    return await this.bookmarkRepository.findAllPostBookmark(diaryId, userId);
  };

  findPostBookmark = async (postId, userId) => {
    return await this.bookmarkRepository.findPostBookmark(postId, userId);
  };

  createPostBookmark = async (postId, userId) => {
    // const exPost = await this.postRepository.findPost(postId);
    // if (!exPost) throw new ValidationError('존재하지 않는 다이어리입니다.');
    // if (exPost.userId !== userId)
    //   throw new AuthorizationError('권한이 없습니다');
    await this.bookmarkRepository.createPostBookmark(postId, userId);
  };

  deletePostBookmark = async (postId, userId) => {
    // const exPost = await this.postRepository.findPost(postId);
    // if (!exPost) throw new ValidationError('존재하지 않는 다이어리입니다.');
    // if (exPost.userId !== userId)
    //   throw new AuthorizationError('권한이 없습니다');
    await this.bookmarkRepository.deletePostBookmark(postId, userId);
  };
}

module.exports = BookmarkService;
