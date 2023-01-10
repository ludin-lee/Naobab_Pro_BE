const UserInfoService = require('../services/userInfo.service');

class UserInfoController {
  updateUserService = new UserInfoService();

  //회원정보 수정
  updateUser = async (req, res) => {
    try {
      const userId = res.locals.userId;
      const profileImg = req.file.location;
      // console.log(image);
      const { nickname } = req.body;
      await this.updateUserService.updateUser(userId, profileImg, nickname);
      return res
        .status(201)
        .json({ message: '프로필 수정에 성공하였습니다.', result: true });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ errormessage: '프로필 수정에 실패하였습니다.', result: false });
    }
  };

  //비밀번호 변경
  updatePassWord = async (req, res) => {
    try {
      const userId = res.locals.userId;
      const { currentPassword, changePassword } = req.body;
      await this.updateUserService.updatePassWord(
        userId,
        currentPassword,
        changePassword,
      );
      return res
        .status(201)
        .json({ message: '비밀번호가 변경되었습니다', result: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errormessage: '비밀번호 변경에 실패하였습니다.',
        result: false,
      });
    }
  };

  //회원탈퇴
  unregisterUSer = async (req, res) => {
    try {
      const userId = res.locals.userId;
      const { currentPassword } = req.body;
      await this.updateUserService.unregisterUSer(userId, currentPassword);
      // console.log(userId);
      // console.log(currentPassword);
      return res.status(201).json({
        message: '회원 탈퇴가 정상적으로 이루어졌습니다.',
        result: true,
      });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ errormessage: '회원 탈퇴에 실패하였습니다.', result: false });
    }
  };
}

module.exports = UserInfoController;
