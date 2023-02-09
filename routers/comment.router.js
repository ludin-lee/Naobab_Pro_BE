const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.post('/:postId', commentController.createComment);
router.patch('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
