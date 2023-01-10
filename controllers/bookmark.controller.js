const BookmarkService = require('../services/bookmark.service');
const SECRET_SUM = parseInt(process.env.SECRET_SUM);
const logger = require('../config/loggers');
class BookmarkController {
  bookmarkService = new BookmarkService();

  //북마크한 다이어리 찾기
  findDiaryBookmark = async (req, res) => {
    const userId = res.locals.userId - SECRET_SUM;
    const exBookmark = await this.bookmarkService.findAllDiaryBookmark(userId);

    return res.status(200).json({ Bookmark_Diaries: exBookmark });
  };
  //다이어리 북마크 만들기
  createDiaryBookmark = async (req, res) => {
    const { diaryId } = req.params;
    const userId = res.locals.userId - SECRET_SUM;

    try {
      const exBookmark = await this.bookmarkService.findDiaryBookmark(
        diaryId,
        userId,
      );

      if (exBookmark) {
        await this.bookmarkService.deleteDiaryBookmark(diaryId, userId);

        return res
          .status(200)
          .json({ message: '북마크 삭제에 성공하였습니다.', result: true });
      } else {
        await this.bookmarkService.createDiaryBookmark(diaryId, userId);

        return res
          .status(200)
          .json({ message: '북마크 저장에 성공하였습니다.', result: true });
      }
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '북마크 저장및 삭제에 실패하였습니다.',
      });
    }
  };
  // 북마크한 게시글 찾기
  findPostBookmark = async (req, res) => {
    const { diaryId } = req.params;
    const userId = res.locals.userId - SECRET_SUM;

    try {
      const Bookmark_Posts = await this.bookmarkService.findAllPostBookmark(
        diaryId,
        userId,
      );

      return res.status(200).json({ Bookmark_Posts });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '북마크 조회에 실패하였습니다.',
      });
    }
  };
  // 일기장 북마크 만들기
  createPostBookmark = async (req, res) => {
    const { postId } = req.params;
    const userId = res.locals.userId - SECRET_SUM;

    try {
      const exBookmark = await this.bookmarkService.findPostBookmark(
        postId,
        userId,
      );

      if (exBookmark) {
        await this.bookmarkService.deletePostBookmark(postId, userId);

        return res
          .status(200)
          .json({ message: '북마크 삭제에 성공하였습니다.', result: true });
      } else {
        await this.bookmarkService.createPostBookmark(postId, userId);

        return res
          .status(200)
          .json({ message: '북마크 저장에 성공하였습니다.', result: true });
      }
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '북마크 저장에 실패하였습니다.',
      });
    }
  };
}
module.exports = BookmarkController;
