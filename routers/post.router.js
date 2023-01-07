const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post.controller');
const postController = new PostController();
const upload = require('../middlewares/awsS3PostMiddleware');

router.post('/:diaryId', upload.single('image'), postController.createPost);
router.get('/:diaryId', postController.findPost);
// router.get('/:postId', postController.findDetailPost);
router.patch('/:postId', upload.single('image'), postController.patchPost);
router.delete('/:postId', postController.deletePost);

module.exports = router;
