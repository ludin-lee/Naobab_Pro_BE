const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');
const commentRouter = require('./comment.router');
const bookmarkRouter = require('./bookmark.router');
const tagRotuer = require('./tag.router');
const authMiddleware = require('../middlewares/auth');

router.use('/auth', authRouter);
router.use('/comment', authMiddleware, commentRouter);
router.use('/bookmark', authMiddleware, bookmarkRouter);

module.exports = router;
