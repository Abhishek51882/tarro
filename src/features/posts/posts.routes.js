import express from 'express';
import PostController from './posts.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

const router = express.Router();
const postController = new PostController();

// Post routes
router.get('/all', jwtAuth, postController.getAllPosts.bind(postController));
router.get('/:postId', jwtAuth, postController.getPostById.bind(postController));
router.get('/user/:userId', jwtAuth, postController.getUserPosts.bind(postController));
router.post('/', jwtAuth, upload.single('image'), postController.createPost.bind(postController));
router.put('/:postId', jwtAuth, upload.single('image'), postController.updatePost.bind(postController));
router.delete('/:postId', jwtAuth, postController.deletePost.bind(postController));

export default router;