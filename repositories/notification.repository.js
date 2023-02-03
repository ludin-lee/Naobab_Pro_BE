const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class NotificationRepository {
  constructor(NotificationModel, UserModel) {
    this.notificationModel = NotificationModel;
  }

  //알림 조회
  findNotification = async (userId) => {
    const query = `select notificationId, code, Notifications.userId,nickname,audienceId,Notifications.diaryId,diaryName,postId,confirm,Notifications.createdAt,
    (select nickname from Users  where userId = Notifications.audienceId) as audienceNickname,comment
    from Notifications
    LEFT JOIN  Diaries
    On Notifications.diaryId = Diaries.diaryId 
    LEFT JOIN Users
    On Notifications.userId = Users.userId
    where Notifications.userId = ${userId}
   `;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
  };

  //알림 확인
  updateNotification = async (notificationId) => {
    await this.notificationModel.update(
      { confirm: true },
      { where: { notificationId } },
    );
  };

  //알림 단일 조회_권한 체크용
  findBasicNotification = async (notificationId) => {
    return await this.notificationModel.findOne({
      where: { notificationId },
    });
  };

  //초대 및 일기 알림 만들기
  createNotification = async (code, userId, audienceId, diaryId) => {
    await this.notificationModel.create({
      code,
      userId,
      audienceId,
      diaryId,
    });
  };

  //댓글 알림 만드기
  createCommentsNotification = async (
    code,
    userId,
    audienceId,
    diaryId,
    postId,
    comment,
  ) => {
    await this.notificationModel.create({
      code,
      userId,
      audienceId,
      diaryId,
      postId,
      comment,
    });
  };
  //알림 삭제
  deleteNotification = async (notificationId) => {
    await this.notificationModel.destroy({ where: { notificationId } });
  };
}

module.exports = NotificationRepository;
