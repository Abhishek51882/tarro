import express from 'express';
import UserController from './users.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const router = express.Router();
const userController = new UserController();

// User routes
router.post('/signup', userController.signUp.bind(userController));
router.post('/signin', userController.signIn.bind(userController));
router.post('/logout', jwtAuth, userController.logout.bind(userController));
router.post('/logout-all-devices', jwtAuth, userController.logoutAllDevices.bind(userController));
router.get('/get-details/:userId', jwtAuth, userController.getUserDetails.bind(userController));
router.get('/get-all-details', jwtAuth, userController.getAllUserDetails.bind(userController));
router.put('/update-details/:userId', jwtAuth, userController.updateUserDetails.bind(userController));

export default router;