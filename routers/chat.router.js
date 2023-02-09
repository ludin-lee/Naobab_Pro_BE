const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/chat.controller');
const chatController = new ChatController();

router.get('/:diaryId/:page', chatController.showChat);

module.exports = router;
