import ChatRepository from './chat.repository.js';

export default class ChatController {
  constructor() {
    this.chatRepository = new ChatRepository();
  }

  async getMessages(req, res) {
    try {
      const { roomId } = req.params;
      const messages = await this.chatRepository.getMessages(roomId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async sendMessage(req, res) {
    try {
      const { roomId } = req.params;
      const { text } = req.body;
      console.log("Enter sendMessage",text)
      const message = await this.chatRepository.sendMessage(roomId, req.userId, text);
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createRoom(req, res) {
    try {
      const { name, members } = req.body;
      const room = await this.chatRepository.createRoom(name, members);
      res.json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRooms(req, res) {
    try {
      const rooms = await this.chatRepository.getRooms(req.userId);
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}