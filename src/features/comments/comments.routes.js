import express from 'express';
import CommentController from './comments.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const router = express.Router();
const commentController = new CommentController();

// Comment routes
router.get('/:postId', jwtAuth, commentController.getCommentsByPostId.bind(commentController));
router.post('/:postId', jwtAuth, commentController.addComment.bind(commentController));
router.put('/:commentId', jwtAuth, commentController.updateComment.bind(commentController));
router.delete('/:commentId', jwtAuth, commentController.deleteComment.bind(commentController));

export default router;