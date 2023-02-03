const express = require('express');
const router = express.Router();
const upload = require('../middlewares/awsS3ProfileMiddleware');
const passport = require('passport');
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();
const SocialLogin = require('../controllers/sociallogin.controller');

router.post('/signup', upload.single('image'), authController.signup); //회원가입
router.post('/login', authController.login); //로컬 로그인

router.get('/login/kakao', SocialLogin.Kakao); //카카오톡 로그인
router.get(
  '/login/kakao/callback',
  SocialLogin.KakaoCallBack,
  SocialLogin.ResponseToken,
);

router.get('/login/naver', SocialLogin.Naver);
router.get(
  '/login/naver/callback',
  SocialLogin.NaverCallBack,
  SocialLogin.ResponseToken,
);

module.exports = router;
