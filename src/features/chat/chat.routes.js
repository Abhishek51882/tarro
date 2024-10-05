import express from 'express';
import ChatController from './chat.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const router = express.Router();
const chatController = new ChatController();

// Get messages for a specific chat room
router.get('/messages/:roomId', jwtAuth, chatController.getMessages.bind(chatController));

// Send a message to a specific chat room
router.post('/messages/:roomId', jwtAuth, chatController.sendMessage.bind(chatController));

// Create a new chat room
router.post('/rooms', jwtAuth, chatController.createRoom.bind(chatController));

// Get all chat rooms for a user
router.get('/rooms', jwtAuth, chatController.getRooms.bind(chatController));

export default router;