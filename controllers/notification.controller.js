const NotificationService = require('../services/notification.service');
const SECRET_SUM = parseInt(process.env.SECRET_SUM);
const logger = require('../config/loggers');
class NotificationController {
  notificationService = new NotificationService();

  //알림 조회
  findNotification = async (req, res) => {
    const userId = res.locals.userId - SECRET_SUM;

    try {
      const Notifications = await this.notificationService.findNotification(
        userId,
      );

      return res.status(200).json({ Notifications });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '알림조회에 실패하였습니다.',
      });
    }
  };

  //알림 확인
  updateNotification = async (req, res) => {
    const { notificationId } = req.params;
    const userId = res.locals.userId - SECRET_SUM;

    try {
      await this.notificationService.updateNotification(userId, notificationId);

      return res.status(200).json({ message: '알림 확인 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '알림 확인에 실패하였습니다.',
      });
    }
  };
  //알림 식제
  deleteNotification = async (req, res) => {
    const { notificationId } = req.params;
    const userId = res.locals.userId - SECRET_SUM;

    try {
      await this.notificationService.deleteNotification(userId, notificationId);

      return res.status(200).json({ message: '알림 삭제 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '알림 삭제에 실패하였습니다.',
      });
    }
  };
}
module.exports = NotificationController;
