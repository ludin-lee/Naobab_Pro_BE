const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');
const updateUserRouter = require('./userInfo.router');
const diaryRouter = require('./diary.router');
const postRouter = require('./post.router');
const commentRouter = require('./comment.router');
const bookmarkRouter = require('./bookmark.router');
const authMiddleware = require('../middlewares/auth');

router.use('/auth', authRouter);
router.use('/userInfo', authMiddleware, updateUserRouter);
router.use('/diary', authMiddleware, diaryRouter);
router.use('/post', authMiddleware, postRouter);
router.use('/comment', authMiddleware, commentRouter);
router.use('/bookmark', authMiddleware, bookmarkRouter);

module.exports = router;
