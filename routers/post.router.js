const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post.controller');
const postController = new PostController();
const upload = require('../middlewares/awsS3PostMiddleware');

router.post('/:diaryId', upload.single('image'), postController.createPost); //일기장 작성
router.get('/tag/:diaryId', postController.findTag); //태그 목록 조회
router.get('/detail/:postId', postController.findDetailPost); //일기장 상세조회
router.get('/:diaryId/search', postController.searchPost); //일기장 검색
router.get('/:diaryId', postController.findPost); // 일기장 전체 조회
router.patch('/:postId', upload.single('image'), postController.patchPost); //일기장 수정
router.delete('/:postId', postController.deletePost); //일기장 삭제

module.exports = router;
