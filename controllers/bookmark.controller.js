const BookmarkService = require('../services/bookmark.service');
const { SECRET_SUM } = process.env;
class BookmarkController {
  bookmarkService = new BookmarkService();

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
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '북마크 저장에 실패하였습니다.',
      });
    }
  };

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
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '북마크 저장에 실패하였습니다.',
      });
    }
  };
}
module.exports = BookmarkController;
