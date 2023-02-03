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
    const query = `select Diaries.diaryId, couple, diaryName,outsideColor,insideColor,sticker,design,if(bookmarkId IS NULL, FALSE,TRUE) as bookmark,nickname,
    (select nickname from Users  where userId = Diaries.invitedId) as invitedNickname,
    (select profileImg from Users  where userId = Diaries.invitedId) as invitedProfileImg
    from Diaries 
    LEFT JOIN  Bookmark_diaries
    On Diaries.diaryId = Bookmark_diaries.diaryId 
    LEFT JOIN Users
    On Diaries.userId = Users.userId
    where Diaries.userId = ${userId} or Diaries.invitedId = ${userId}
   `;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
  };

  //다이어리 수정
  patchDiary = async (
    diaryId,
    diaryName,
    outsideColor,
    insideColor,
    sticker,
    design,
  ) => {
    await this.diaryModel.update(
      {
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

  //공유 다이어리에서 초대된 사람 지우기
  deleteInvite = async (diaryId) => {
    await this.diaryModel.update({ invitedId: null }, { where: { diaryId } });
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

  //다이어리 초대수락
  inviteDiary = async (userId, diaryId) => {
    await this.diaryModel.update({ invitedId: userId }, { where: { diaryId } });
  };
}

module.exports = DiaryRepository;
