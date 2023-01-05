const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');
const diaryRouter = require('./diary.router');
const commentRouter = require('./comment.router');
const bookmarkRouter = require('./bookmark.router');
const authMiddleware = require('../middlewares/auth');

router.use('/auth', authRouter);
router.use('/diary', authMiddleware, diaryRouter);
router.use('/comment', authMiddleware, commentRouter);
router.use('/bookmark', authMiddleware, bookmarkRouter);


module.exports = router;
