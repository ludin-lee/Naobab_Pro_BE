const express = require('express');
const router = express.Router();
const BookmarkController = require('../controllers/bookmark.controller');
const bookmarkController = new BookmarkController();

router.get('/diary', bookmarkController.findDiaryBookmark);
router.post('/diary/:diaryId', bookmarkController.createDiaryBookmark);
router.get('/diary/:diaryId/post', bookmarkController.findPostBookmark);
router.post('/post/:postId', bookmarkController.createPostBookmark);

module.exports = router;
