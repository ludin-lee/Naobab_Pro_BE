const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
class DiaryRepository {
  constructor(DiaryModel) {
    this.diaryModel = DiaryModel;
  }

  //다이어리 생성
  createDiary = async (userId, couple, diaryName, outsideColor) => {
    await this.diaryModel.create({
      userId,
      couple,
      diaryName,
      outsideColor,
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
  patchDiary = async (userId, diaryId, couple, diaryName, outsideColor) => {
    await this.diaryModel.update(
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
    await this.diaryModel.destroy({ userId, where: { diaryId } });
  };

  postDiary = async (postId) => {
    return await this.diaryModel.findAll({
      where: { postId },
      order: [['createdAt', 'DESC']],
    });
  };

  exDiary = async (diaryId) => {
    return await this.diaryModel.findAll({
      where: { diaryId },
      order: [['createdAt', 'DESC']],
    });
  };

  findAllDiaryBookmark = async (userId) => {};
}

module.exports = DiaryRepository;
