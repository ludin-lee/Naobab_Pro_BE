const express = require('express');
const router = express.Router();
const upload = require('../middlewares/awsS3ProfileMiddleware');
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

router.post('/signup', upload.single('image'), authController.signup); //회원가입

router.post('/login', authController.login); //로컬 로그인
router.post('/login/kakao', authController.kakaoLogin); //카카오톡 로그인

module.exports = router;
