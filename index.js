import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './src/features/users/users.routes.js';
import postRoutes from './src/features/posts/posts.routes.js';
import commentRoutes from './src/features/comments/comments.routes.js';
import likeRoutes from './src/features/likes/likes.routes.js';
import friendRoutes from './src/features/friendship/friendship.routes.js';
import otpRoutes from './src/features/otp/otp.routes.js';
import chatRoutes from './src/features/chat/chat.routes.js'; // Import chat routes

import { connectUsingMongoose } from './src/config/mongooseConfig.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(cors());
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware to parse JSON bodies
app.use(json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/chat', chatRoutes); // Use chat routes

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('sendMessage', ({ roomId, message }) => {
    // io.to(roomId).emit('receiveMessage', message);
    io.emit('receiveMessage',message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).send(err.message);
  }

  return res.status(500).send("There is some error, come back later");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("API not found");
});

// Start the server
httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectUsingMongoose();
});