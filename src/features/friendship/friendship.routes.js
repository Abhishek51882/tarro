import express from 'express';
import FriendshipController from './friendship.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const router = express.Router();
const friendshipController = new FriendshipController();

// Friendship routes
router.get('/get-friends/:userId', jwtAuth, friendshipController.getFriends.bind(friendshipController));
router.get('/get-pending-requests', jwtAuth, friendshipController.getPendingRequests.bind(friendshipController));
router.post('/toggle-friendship/:friendId', jwtAuth, friendshipController.toggleFriendship.bind(friendshipController));
router.post('/response-to-request/:friendId', jwtAuth, friendshipController.respondToRequest.bind(friendshipController));
router.post('/send-request/:friendId', jwtAuth, friendshipController.sendFriendRequest.bind(friendshipController));

export default router;