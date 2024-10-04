import FriendshipModel from "./friendship.schema.js";

export default class FriendshipRepository {
    async getFriends(userId) {
        return await FriendshipModel.find({ user: userId, status: 'accepted' }).populate('friend', 'name email');
    }

    async getPendingRequests(userId) {
        return await FriendshipModel.find({ friend: userId, status: 'pending' }).populate('user', 'name email');
    }

    async toggleFriendship(friendId, userId) {
        const friendship = await FriendshipModel.findOne({ user: userId, friend: friendId });
        if (friendship) {
            await FriendshipModel.findByIdAndDelete(friendship._id);
            return { message: "Friendship removed" };
        } else {
            const newFriendship = new FriendshipModel({ user: userId, friend: friendId, status: 'pending' });
            await newFriendship.save();
            return newFriendship;
        }
    }

    async respondToRequest(friendId, accept) {
        const friendship = await FriendshipModel.findOne({ user: friendId, status: 'pending' });
        if (friendship) {
            friendship.status = accept ? 'accepted' : 'rejected';
            await friendship.save();
            return friendship;
        } else {
            throw new Error("Friend request not found");
        }
    }

    async sendFriendRequest(userId, friendId) {
        const existingRequest = await FriendshipModel.findOne({ user: userId, friend: friendId });
        if (existingRequest) {
            throw new Error('Friend request already sent');
        }
        const friendship = new FriendshipModel({ user: userId, friend: friendId });
        return await friendship.save();
    }
}