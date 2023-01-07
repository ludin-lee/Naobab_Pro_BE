const { json } = require('sequelize');
const DiaryService = require('../services/diary.service');
const SECRET_SUM = parseInt(process.env.SECRET_SUM);

class DiaryController {
  diaryService = new DiaryService();

  //다이어리 생성
  createDiary = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { couple, diaryName, outsideColor } = req.body;
      console.log(userId);
      console.log(res.locals);
      await this.diaryService.createDiary(
        userId,
        couple,
        diaryName,
        outsideColor,
      );
      return res
        .status(201)
        .json({ message: '다이어리 생성 성공', result: true });
    } catch (error) {
      // console.log(error);
      return res.status(400).json({ errorMessage: '다이어리 생성 실패' });
    }
  };

  //다이어리 조회
  findDiary = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const diary = await this.diaryService.findDiary(userId);
      return res.status(200).json({ data: diary, result: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '다이어리 조회 실패' });
    }
  };

  //다이어리 수정
  patchDiary = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { diaryId } = req.params;
      const { couple, diaryName, outsideColor } = req.body;
      await this.diaryService.patchDiary(
        userId,
        diaryId,
        couple,
        diaryName,
        outsideColor,
      );
      return res
        .status(201)
        .json({ message: '다이어리 수정 성공', result: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '다이어리 수정 실패' });
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
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '다이어리 삭제 실패' });
    }
  };
}

module.exports = DiaryController;
