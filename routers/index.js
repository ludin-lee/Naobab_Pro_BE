const express = require('express');
const router = express.Router();
const authRouter = require('./auth.router');
const diaryRouter = require('./diary.router');
const auth = require('../middlewares/auth');

router.use('/auth', authRouter);
router.use('/diary', auth, diaryRouter);

module.exports = router;
