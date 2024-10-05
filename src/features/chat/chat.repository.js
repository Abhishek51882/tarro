import ChatRoomModel from './chatRoom.schema.js';
import MessageModel from './message.schema.js';

export default class ChatRepository {
  async getMessages(roomId) {
    return await MessageModel.find({ room: roomId }).populate('user', 'name avatar').sort('createdAt');
  }

  async sendMessage(roomId, userId, text) {
    const message = new MessageModel({ room: roomId, user: userId, text });
    await message.save();
    return await message.populate('user', 'name avatar');
  }

  async createRoom(name, members) {
    const room = new ChatRoomModel({ name, members });
    await room.save();
    return room;
  }

  async getRooms(userId) {
    return await ChatRoomModel.find({ members: userId }).populate('members', 'name avatar');
  }
}