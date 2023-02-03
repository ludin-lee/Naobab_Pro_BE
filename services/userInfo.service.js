const { Users } = require('../models');
const UserInfoRepository = require('../repositories/userInfo.repository');
const bcrypt = require('bcryptjs');
const {
  ValidationError,
  AuthorizationError,
  BadRequestError,
} = require('../exceptions/index.exception');
const PASSWORD_SALT = parseInt(process.env.PASSWORD_SALT);

class UserInfoService {
  userInfoRepository = new UserInfoRepository(Users);

  //회원 정보 조회
  findUserBasicInfo = async (userId) => {
    const userInfo = await this.userInfoRepository.findUserBasicInfo(userId);
    if (!userInfo) throw new ValidationError('유저가 존재하지 않습니다.');

    return userInfo;
  };

  //회원정보 수정
  updateUser = async (userId, profileImg, nickname) => {
    const userInfo = await this.userInfoRepository.findUserInfo(userId);
    // const hashedPassword = await bcrypt.hash(currentPassword, PASSWORD_SALT);

    // const checkPassword = await bcrypt.compare(
    //   currentPassword,
    //    userInfo.password,
    //  );
    //  if (!checkPassword) throw new AuthorizationError('비밀번호를 확인해주세요');

    if (!nickname) throw new ValidationError('모든 항목을 입력해주세요');
    await this.userInfoRepository.updateUser(userId, profileImg, nickname);
  };

  //비밀번호 변경
  updatePassWord = async (
    userId,
    currentPassword,
    changePassword,
    confirmPassword,
  ) => {
    if (changePassword !== confirmPassword)
      throw new AuthorizationError(
        '변경할 비밀번호가 일치하지 않습니다. 다시 확인해주세요',
      );

    const userInfo = await this.userInfoRepository.findUserInfo(userId);
    const checkPassword = await bcrypt.compare(
      currentPassword,
      userInfo.password,
    );
    if (!checkPassword) throw new AuthorizationError('비밀번호를 확인해주세요');

    const hashedChangePassword = await bcrypt.hash(
      changePassword,
      parseInt(PASSWORD_SALT),
    );

    await this.userInfoRepository.updatePassWord(userId, hashedChangePassword);
  };

  //회원탈퇴
  unregisterUser = async (userId, currentPassword) => {
    const userInfo = await this.userInfoRepository.findUserInfo(userId);
    if (!userInfo) throw new ValidationError('유저가 존재하지 않습니다.');

    const checkPassword = await bcrypt.compare(
      currentPassword,
      userInfo.password,
    );
    if (!checkPassword) throw new AuthorizationError('비밀번호를 확인해주세요');

    await this.userInfoRepository.unregisterUser(userId);
  };

  //닉네임 회원정보 조회
  findUserNickname = async (nickname, userId) => {
    const userInfo = await this.userInfoRepository.findUserNickname(nickname);
    if (userInfo.userId === userId)
      throw new BadRequestError('본인은 검색할 수 없습니다.');
    if (!userInfo) throw new ValidationError('유저가 존재하지 않습니다.');

    return userInfo;
  };
}

module.exports = UserInfoService;
