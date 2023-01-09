const DiaryRepository = require('../repositories/diary.repository');
const { Diaries } = require('../models');

const {
  NotFoundError,
  ValidationError,
  AuthorizationError,
} = require('../exceptions/index.exception');

class DiaryService {
  constructor() {
    this.DiaryRepository = new DiaryRepository(Diaries);
  }
  diaryRepository = new DiaryRepository();

  //다이어리 생성
  createDiary = async (userId, couple, diaryName, outsideColor) => {
    if (!diaryName || !outsideColor || couple === undefined)
      throw new ValidationError('모든 항목을 입력해주세요');

    await this.diaryRepository.createDiary(
      userId,
      couple,
      diaryName,
      outsideColor,
    );
  };

  //다이어리 조회
  findDiary = async (userId) => {
    const diary = await this.diaryRepository.findDiary(userId);

    if (!diary) throw new NotFoundError('다이어리가 존재하지 않습니다.');

    return diary;
  };

  //다이어리 수정
  patchDiary = async (userId, diaryId, couple, diaryName, outsideColor) => {
    const diary = await this.diaryRepository.exDiary(diaryId);

    if (!diary) throw new NotFoundError('다이어리가 존재하지 않습니다.');

    if (diary.userId !== userId && diary.invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    if (!diaryName || !outsideColor || couple === undefined)
      throw new ValidationError('모든 항목을 입력해주세요.');

    await this.diaryRepository.patchDiary(
      userId,
      diaryId,
      couple,
      diaryName,
      outsideColor,
    );
  };

  //다이어리 삭제
  deleteDiary = async (userId, diaryId) => {
    const diary = await this.diaryRepository.exDiary(diaryId);

    if (!diary) throw new NotFoundError('다이어리가 존재하지 않습니다.');

    if (diary.userId !== userId && diary.invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    await this.diaryRepository.deleteDiary(userId, diaryId);
  };
}

module.exports = DiaryService;
