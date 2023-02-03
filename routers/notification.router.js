const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/notification.controller');
const notificationController = new NotificationController();

router.get('/', notificationController.findNotification); //알림 조회
router.patch('/:notificationId', notificationController.updateNotification); //알림 확인
router.delete('/:notificationId', notificationController.deleteNotification); //알림 삭제
module.exports = router;
