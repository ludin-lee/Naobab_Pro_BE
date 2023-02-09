const NotificationRepository = require('../repositories/notification.repository');
const { Notifications, Users } = require('../models');
const {
  ValidationError,
  AuthorizationError,
  NotFoundError,
} = require('../exceptions/index.exception');

class NotificationService {
  notificationRepository = new NotificationRepository(Notifications, Users);

  //알림 조회
  findNotification = async (userId) => {
    return await this.notificationRepository.findNotification(userId);
  };

  //알림 확인
  updateNotification = async (userId, notificationId) => {
    const notification =
      await this.notificationRepository.findBasicNotification(notificationId);
    if (!notification) throw new NotFoundError('존재하지 않는 알림입니다.');
    if (notification.userId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    await this.notificationRepository.updateNotification(notificationId);
  };

  //알림 삭제
  deleteNotification = async (userId, notificationId) => {
    const notification =
      await this.notificationRepository.findBasicNotification(notificationId);
    if (!notification) throw new NotFoundError('존재하지 않는 알림입니다.');
    if (notification.userId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    await this.notificationRepository.deleteNotification(notificationId);
  };
}

module.exports = NotificationService;
