const express = require('express');
const router = express.Router();
const UserInfoController = require('../controllers/userInfo.controller');
const userInfoController = new UserInfoController();
const upload = require('../middlewares/awsS3ProfileMiddleware');

router.get('/', userInfoController.findUserInfo); //회원 정보 조회
router.patch('/profile', upload.single('image'), userInfoController.updateUser); //프로필 및 닉네임 변경
router.patch('/password', userInfoController.updatePassWord); //패스워드 변경
router.patch('/unregister', userInfoController.unregisterUSer); //탈퇴
router.get('/nickname/:nickname', userInfoController.findUserNickname); //닉네임으로 조회

module.exports = router;
