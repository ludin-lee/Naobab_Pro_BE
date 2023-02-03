const BookmarkRepository = require('../repositories/bookmark.repository');
const DiaryRepository = require('../repositories/diary.repository');
const PostRepository = require('../repositories/post.repository');

const { Bookmark_diary, Bookmark_post, Diaries, Posts } = require('../models');
const {
  ValidationError,
  AuthorizationError,
} = require('../exceptions/index.exception');

class BookmarkService {
  bookmarkRepository = new BookmarkRepository(Bookmark_diary, Bookmark_post);
  diaryRepository = new DiaryRepository(Diaries);
  postRepository = new PostRepository(Posts);

  //내 북마크 다이어리 목록 조회
  findAllDiaryBookmark = async (userId) => {
    return await this.diaryRepository.findAllDiaryBookmark(userId);
  };

  //다이어리 북마크 여부 조회
  findDiaryBookmark = async (diaryId, userId) => {
    return await this.bookmarkRepository.findDiaryBookmark(diaryId, userId);
  };

  //다이어리 북마크 생성
  createDiaryBookmark = async (diaryId, userId) => {
    const exDiary = await this.diaryRepository.exDiary(diaryId);
    if (!exDiary) throw new ValidationError('존재하지 않는 다이어리입니다.');
    if (exDiary.userId !== userId && exDiary.invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    await this.bookmarkRepository.createDiaryBookmark(diaryId, userId);
  };
  //다이어리 북마크 삭제
  deleteDiaryBookmark = async (diaryId, userId) => {
    const exDiary = await this.diaryRepository.exDiary(diaryId);
    if (!exDiary) throw new ValidationError('존재하지 않는 다이어리입니다.');
    if (exDiary.userId !== userId && exDiary.invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    await this.bookmarkRepository.deleteDiaryBookmark(diaryId, userId);
  };

  //북마크 일기장 조회
  findAllPostBookmark = async (diaryId, userId) => {
    return await this.postRepository.findAllPostBookmark(diaryId, userId);
  };

  //일기장 북마크 여부 조회
  findPostBookmark = async (postId, userId) => {
    return await this.bookmarkRepository.findPostBookmark(postId, userId);
  };

  //일기장 북마크 생성
  createPostBookmark = async (postId, userId) => {
    const exPost = await this.postRepository.findDetailPost(postId);
    const exDiary = await this.diaryRepository.exDiary(exPost.diaryId);

    if (!exPost) throw new ValidationError('존재하지 않는 일기장입니다.');
    if (exDiary.invitedId !== userId && exDiary.userId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    await this.bookmarkRepository.createPostBookmark(postId, userId);
  };
  //일기장 북마크 삭제
  deletePostBookmark = async (postId, userId) => {
    const exPost = await this.postRepository.findDetailPost(postId);
    const exDiary = await this.diaryRepository.exDiary(exPost.diaryId);
    if (!exPost) throw new ValidationError('존재하지 않는 일기장입니다.');
    if (exDiary.invitedId !== userId && exDiary.userId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    await this.bookmarkRepository.deletePostBookmark(postId, userId);
  };
}

module.exports = BookmarkService;
