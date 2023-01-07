const express = require('express');
const router = express.Router();

const DiaryController = require('../controllers/diary.controller');
const diaryController = new DiaryController();

router.post('/', diaryController.createDiary);
router.get('/', diaryController.findDiary);
router.patch('/:diaryId', diaryController.patchDiary);
router.delete('/:diaryId', diaryController.deleteDiary);

module.exports = router;
