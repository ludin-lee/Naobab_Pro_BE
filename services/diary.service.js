const DiaryRepository = require('../repositories/diary.repository');
const NotificationRepository = require('../repositories/notification.repository');
const ChatRepository = require('../repositories/chat.repository');
const { Diaries, Notifications, Chats, Users } = require('../models');
const moment = require('moment');

const {
  NotFoundError,
  ValidationError,
  AuthorizationError,
  BadRequestError,
} = require('../exceptions/index.exception');

class DiaryService {
  diaryRepository = new DiaryRepository(Diaries);
  notificationRepository = new NotificationRepository(Notifications);
  chatRepository = new ChatRepository(Chats, Users);
  //다이어리 생성
  createDiary = async (
    userId,
    couple,
    diaryName,
    outsideColor,
    insideColor,
    sticker,
    design,
  ) => {
    if (!diaryName) throw new ValidationError('필수 항목을 입력해주세요');

    await this.diaryRepository.createDiary(
      userId,
      couple,
      diaryName,
      outsideColor,
      insideColor,
      sticker,
      design,
    );
  };

  //다이어리 조회
  findDiary = async (userId) => {
    const diary = await this.diaryRepository.findDiary(userId);

    if (!diary) throw new NotFoundError('다이어리가 존재하지 않습니다.');

    return diary;
  };

  //다이어리 수정
  patchDiary = async (
    diaryId,
    userId,
    diaryName,
    outsideColor,
    insideColor,
    sticker,
    design,
  ) => {
    const diary = await this.diaryRepository.exDiary(diaryId);

    if (!diary) throw new NotFoundError('다이어리가 존재하지 않습니다.');
    if (diary.userId !== userId && diary.invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    if (!diaryName) throw new ValidationError('필수 항목을 입력해주세요.');

    await this.diaryRepository.patchDiary(
      diaryId,
      diaryName,
      outsideColor,
      insideColor,
      sticker,
      design,
    );
  };

  //다이어리 삭제
  deleteDiary = async (userId, diaryId) => {
    const diary = await this.diaryRepository.exDiary(diaryId);

    if (!diary) throw new NotFoundError('다이어리가 존재하지 않습니다.');

    if (diary.invitedId === userId)
      await this.diaryRepository.deleteInvite(diaryId);
    else if (diary.userId !== userId) {
      throw new AuthorizationError('권한이 없습니다');
    } else if (diary.userId === userId)
      await this.diaryRepository.deleteDiary(userId, diaryId);
  };

  //다이어리 초대 수락
  inviteAcceptDiary = async (userId, diaryId, notificationId) => {
    const diary = await this.diaryRepository.exDiary(diaryId);

    if (!diary) throw new NotFoundError('다이어리가 존재하지 않습니다.');
    if (diary.couple !== true)
      throw new BadRequestError('공유다이어리가 아닙니다.');
    if (diary.invitedSecureId !== userId)
      throw new AuthorizationError('초대된 사용자가 아닙니다.');
    await this.diaryRepository.inviteAcceptDiary(userId, diaryId);

    await this.notificationRepository.createNotification(
      4, //4번코드 :다이어리 초대수락
      diary.userId, // 다이어리 주인
      userId, //   다이어리 수락한 사람
      diaryId, //다이어리 번호
    );
    await this.notificationRepository.deleteNotification(notificationId);
  };

  inviteDiary = async (userId, diaryId, invitedId) => {
    const diary = await this.diaryRepository.exDiary(diaryId);

    if (!diary) throw new NotFoundError('다이어리가 존재하지 않습니다.');
    if (diary.couple !== true)
      throw new BadRequestError('공유다이어리가 아닙니다.');
    if (diary.userId !== userId)
      throw new AuthorizationError('권한이 없습니다.');
    await this.notificationRepository.createNotification(
      1,
      invitedId,
      userId,
      diaryId,
    );

    await this.diaryRepository.inviteDiary(invitedId, diaryId);
  };
  //공유 다이어리 조회
  findShareDiary = async (userId) => {
    const diary = await this.diaryRepository.findShareDiary(userId);

    for (let i in diary) {
      let lastChat = await this.chatRepository.showLastChat(124);
      diary[i].lastChat =
        lastChat !== (null || undefined)
          ? lastChat.chat
          : '최근 채팅이 없습니다.';
      diary[i].time =
        lastChat !== (null || undefined) ? lastChat.createdAt : null;
    }
    return diary;
  };
}

module.exports = DiaryService;
