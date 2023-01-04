const express = require('express');
const router = express.Router();
const BookmarkController = require('../controllers/bookmark.controller');
const bookmarkController = new BookmarkController();

router.post('/diary/:diaryId', bookmarkController.createDiaryBookmark);
router.post('/post/:postId', bookmarkController.createPostBookmark);

module.exports = router;
