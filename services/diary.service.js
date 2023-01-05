const DiaryRepository = require('../repositories/diary.repository');
const { Diaries } = require('../models');

const {
  ValidationError,
  NotFoundError,
  BadRequestError,
} = require('../exceptions/index.exception');

class DiaryService {
  constructor() {
    this.DiaryRepository = new DiaryRepository(Diaries);
  }
  diaryRepository = new DiaryRepository();

  //다이어리 생성
  createDiary = async (userId, couple, diaryName, outsideColor) => {
    console.log(couple);
    if (!diaryName || !outsideColor || couple === undefined) {
      throw new BadRequestError('모든 항목을 입력해주세요');
    }
    const result = await this.diaryRepository.createDiary(
      userId,
      couple,
      diaryName,
      outsideColor,
    );
    return result;
  };

  //다이어리 조회
  findDiary = async (userId) => {
    const diary = await this.diaryRepository.findDiary(userId);
    if (!diary) {
      throw new NotFoundError('다이어리가 존재하지 않습니다.');
    }
    return result;
  };

  //다이어리 수정
  patchDiary = async (userId, diaryId, couple, diaryName, outsideColor) => {
    if (!diaryName || !outsideColor || couple === undefined) {
      throw new BadRequestError('모든 항목을 입력해주세요.');
    }
    const updateDiary = await this.diaryRepository.patchDiary(
      userId,
      diaryId,
      couple,
      diaryName,
      outsideColor,
    );
    return updateDiary;
  };

  //다이어리 삭제
  deleteDiary = async (userId, diaryId) => {
    const deleteDiary = await this.diaryRepository.deleteDiary(userId, diaryId);
    if (!diaryId) {
      throw new NotFoundError('다이어리가 존재하지 않습니다.');
    }
  };
}

module.exports = DiaryService;
