const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
class DiaryRepository {
  constructor(DiaryModel) {
    this.diaryModel = DiaryModel;
  }

  //다이어리 생성
  createDiary = async (
    userId,
    couple,
    diaryName,
    outsideColor,
    insideColor,
    sticker,
    design,
  ) => {
    await this.diaryModel.create({
      userId,
      couple,
      diaryName,
      outsideColor,
      insideColor,
      sticker,
      design,
    });
  };

  //다이어리 조회
  findDiary = async (userId) => {
    return await this.diaryModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  };

  //다이어리 수정
  patchDiary = async (
    diaryId,
    couple,
    diaryName,
    outsideColor,
    insideColor,
    sticker,
    design,
  ) => {
    await this.diaryModel.update(
      {
        couple,
        diaryName,
        outsideColor,
        insideColor,
        sticker,
        design,
      },
      { where: { diaryId } },
    );
  };

  //다이어리 삭제
  deleteDiary = async (userId, diaryId) => {
    await this.diaryModel.destroy({ userId, where: { diaryId } });
  };

  //다이어리 ID로 조회
  exDiary = async (diaryId) => {
    return await this.diaryModel.findOne({
      where: { diaryId },
    });
  };

  //북마크한 다이어리 조회
  findAllDiaryBookmark = async (userId) => {
    const query = `SELECT Diaries.diaryId,couple,diaryName,outsideColor,insideColor,sticker,design,Diaries.userId,invitedId,Diaries.createdAt
    FROM Bookmark_diaries LEFT JOIN Diaries 
    On Diaries.userId = Bookmark_diaries.userId and Diaries.diaryId = Bookmark_diaries.diaryId
    WHERE Diaries.userId = ${userId}
    ORDER BY Diaries.createdAt DESC`;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
  };
}

module.exports = DiaryRepository;
