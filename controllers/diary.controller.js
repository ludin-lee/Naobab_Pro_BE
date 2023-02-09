const DiaryService = require('../services/diary.service');
const SECRET_SUM = parseInt(process.env.SECRET_SUM);
const logger = require('../config/loggers');

class DiaryController {
  diaryService = new DiaryService();

  //다이어리 생성
  createDiary = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { couple, diaryName, outsideColor, insideColor, sticker, design } =
        req.body;

      await this.diaryService.createDiary(
        userId,
        couple,
        diaryName,
        outsideColor,
        insideColor,
        sticker,
        design,
      );

      return res
        .status(201)
        .json({ message: '다이어리 생성 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '다이얼 생성에 실패하였습니다.',
      });
    }
  };

  //다이어리 조회
  findDiary = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const diary = await this.diaryService.findDiary(userId);

      return res.status(200).json({ diaries: diary, result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '다이어리 조회에 실패하였습니다.',
      });
    }
  };

  //다이어리 수정
  patchDiary = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { diaryId } = req.params;
      const { diaryName, outsideColor, insideColor, sticker, design } =
        req.body;

      await this.diaryService.patchDiary(
        diaryId,
        userId,
        diaryName,
        outsideColor,
        insideColor,
        sticker,
        design,
      );

      return res
        .status(201)
        .json({ message: '다이어리 수정 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '다이어리 수정에 실패하였습니다.',
      });
    }
  };

  //다이어리 삭제
  deleteDiary = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { diaryId } = req.params;

      await this.diaryService.deleteDiary(userId, diaryId);

      return res
        .status(201)
        .json({ message: '다이어리 삭제 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '다이어리 삭제에 실패하였습니다.',
      });
    }
  };
  //다이어리 초대 수락
  inviteAcceptDiary = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { diaryId, notificationId } = req.params;

      await this.diaryService.inviteAcceptDiary(
        userId,
        diaryId,
        notificationId,
      );

      return res
        .status(201)
        .json({ message: '다이어리 초대 수락 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '다이어리 초대수락에 실패하였습니다.',
      });
    }
  };

  inviteDiary = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { diaryId, invitedId } = req.params;

      await this.diaryService.inviteDiary(userId, diaryId, invitedId);
      return res
        .status(201)
        .json({ message: '다이어리 초대  성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '다이어리 초대에 실패하였습니다.',
      });
    }
  };
  //공유 다이어리 조회
  findShareDiary = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const diary = await this.diaryService.findShareDiary(userId);

      return res.status(200).json({ diaries: diary, result: true });
    } catch (err) {
      console.log(err);
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '공유 다이어리 조회에 실패하였습니다.',
      });
    }
  };
}

module.exports = DiaryController;
