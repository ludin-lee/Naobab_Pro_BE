const DiaryRepository = require('../repositories/diary.repository');
const { Diaries } = require('../models');

const {
  NotFoundError,
  ValidationError,
  AuthorizationError,
} = require('../exceptions/index.exception');

class DiaryService {
  diaryRepository = new DiaryRepository(Diaries);

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
    couple,
    diaryName,
    outsideColor,
    insideColor,
    sticker,
    design,
  ) => {
    const diary = await this.diaryRepository.exDiary(diaryId);

    if (!diary) throw new NotFoundError('다이어리가 존재하지 않습니다.');

    console.log(diary.userId);
    if (diary.userId !== userId && diary.invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    if (!diaryName) throw new ValidationError('필수 항목을 입력해주세요.');

    await this.diaryRepository.patchDiary(
      diaryId,
      couple,
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

    if (diary.userId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    await this.diaryRepository.deleteDiary(userId, diaryId);
  };
}

module.exports = DiaryService;
