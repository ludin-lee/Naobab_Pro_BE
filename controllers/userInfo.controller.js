const UserInfoService = require('../services/userInfo.service');
const SECRET_SUM = parseInt(process.env.SECRET_SUM);
const logger = require('../config/loggers');

class UserInfoController {
  userInfoService = new UserInfoService();

  //유저 기존 정보 조회
  findUserInfo = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const userInfo = await this.userInfoService.findUserBasicInfo(userId);

      return res.status(201).json({ userInfo, result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '유저 정보 조회에 실패하였습니다.',
      });
    }
  };

  //회원정보 수정
  updateUser = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { currentPassword, nickname } = req.body;

      if (req.file === undefined) {
        req.file = {};
        req.file.location = null;
      }
      const profileImg = req.file.location;

      await this.userInfoService.updateUser(userId, profileImg, nickname);

      return res
        .status(201)
        .json({ message: '프로필 수정에 성공하였습니다.', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '프로필 수정에 실패하였습니다.',
      });
    }
  };

  //비밀번호 변경
  updatePassWord = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { currentPassword, changePassword, confirmPassword } = req.body;

      await this.userInfoService.updatePassWord(
        userId,
        currentPassword,
        changePassword,
        confirmPassword,
      );

      return res
        .status(201)
        .json({ message: '비밀번호가 변경되었습니다', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '비밀번호 변경에 실패하였습니다.',
      });
    }
  };

  //회원탈퇴
  unregisterUSer = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { currentPassword } = req.body;

      await this.userInfoService.unregisterUser(userId, currentPassword);

      return res.status(201).json({
        message: '회원 탈퇴가 정상적으로 이루어졌습니다.',
        result: true,
      });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '회원탈퇴에 실패하였습니다.',
      });
    }
  };


  //닉네임으로 회원 조회
  findUserNickname = async (req, res) => {
    try {
      const { nickname } = req.params;
      const userId = res.locals.userId - SECRET_SUM;
      const userInfo = await this.userInfoService.findUserNickname(
        nickname,
        userId,
      );

      return res.status(201).json({ userInfo, result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '유저 정보 조회에 실패하였습니다.',
      });
    }
  };
}

module.exports = UserInfoController;
