const express = require('express');
const router = express.Router();
const UserInfoController = require('../controllers/userInfo.controller');
const userInfoController = new UserInfoController();
const upload = require('../middlewares/awsS3ProfileMiddleware');

router.patch('/profile', upload.single('image'), userInfoController.updateUser);
router.patch('/password', userInfoController.updatePassWord);
router.delete('/unregister', userInfoController.unregisterUSer);
module.exports = router;
