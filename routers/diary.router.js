const express = require('express');
const router = express.Router();

const DiaryController = require('../controllers/diary.controller');
const diaryController = new DiaryController();

router.post('/', diaryController.createDiary); //다이어리 작성
router.get('/', diaryController.findDiary); //다이어리 조회
router.patch('/:diaryId', diaryController.patchDiary); //다이어리 수정
router.delete('/:diaryId', diaryController.deleteDiary); //다이어리 삭제
router.patch('/invite/:diaryId', diaryController.inviteDiary); //다이어리 초대 수락

module.exports = router;
