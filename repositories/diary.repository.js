const { Model } = require('sequelize');
const { Diaries } = require('../models');

class DiaryRepository {
  constructor(DiaryModel) {
    this.diaryModel = DiaryModel;
  }

  //다이어리 생성
  createDiary = async (userId, couple, diaryName, outsideColor) => {
    const createDiary = await Diaries.create({
      userId,
      couple,
      diaryName,
      outsideColor,
    });
    return createDiary;
  };

  //다이어리 조회
  findDiary = async (userId) => {
    const diary = await Diaries.findAll({
      where: { userId },
      order: [['diaryId', 'DESC']],
    });
    return diary;
  };

  //다이어리 수정
  patchDiary = async (userId, diaryId, couple, diaryName, outsideColor) => {
    // console.log(diaryId);
    // console.log(userId, diaryId, couple, diaryName, outsideColor);
    return await Diaries.update(
      {
        userId,
        couple,
        diaryName,
        outsideColor,
      },
      { where: { diaryId } },
    );
  };

  //다이어리 삭제
  deleteDiary = async (userId, diaryId) => {
    return await Diaries.destroy({ userId, where: { diaryId } });
  };
}

module.exports = DiaryRepository;
