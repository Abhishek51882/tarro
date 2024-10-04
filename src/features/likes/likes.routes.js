import express from 'express';
import LikeController from './likes.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const router = express.Router();
const likeController = new LikeController();

// Like routes
router.get('/:id', jwtAuth, likeController.getLikes.bind(likeController));
router.post('/toggle/:id', jwtAuth, likeController.toggleLike.bind(likeController));

export default router;