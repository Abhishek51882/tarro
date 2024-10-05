// friendship.routes.js
import express from 'express';
import FriendshipController from './friendship.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const router = express.Router();
const friendshipController = new FriendshipController();

// Get friends list
router.get('/get-friends/:userId', jwtAuth, friendshipController.getFriends.bind(friendshipController));

// Get pending friend requests (both incoming and outgoing)
router.get('/get-pending-requests', jwtAuth, friendshipController.getFriendRequests.bind(friendshipController));

// Send a friend request
router.post('/send-request/:userId', jwtAuth, friendshipController.sendFriendRequest.bind(friendshipController));

// Accept a friend request
router.put('/accept-request/:userId', jwtAuth, friendshipController.acceptFriendRequest.bind(friendshipController));

// Reject a friend request
router.put('/reject-request/:userId', jwtAuth, friendshipController.rejectFriendRequest.bind(friendshipController));

// Cancel a sent friend request
router.delete('/cancel-request/:userId', jwtAuth, friendshipController.cancelFriendRequest.bind(friendshipController));

// Remove a friend
router.delete('/remove-friend/:userId', jwtAuth, friendshipController.removeFriend.bind(friendshipController));

// Block a user
router.put('/block/:userId', jwtAuth, friendshipController.blockUser.bind(friendshipController));

// Unblock a user
router.put('/unblock/:userId', jwtAuth, friendshipController.unblockUser.bind(friendshipController));

// Get blocked users list
router.get('/blocked', jwtAuth, friendshipController.getBlockedUsers.bind(friendshipController));

// Get friendship status with a specific user
router.get('/status/:userId', jwtAuth, friendshipController.getFriendshipStatus.bind(friendshipController));

// Get suggested friends (users you may know)
router.get('/suggestions', jwtAuth, friendshipController.getSuggestedFriends.bind(friendshipController));

export default router;