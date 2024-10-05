// friendship.repository.js
import UserModel from '../users/users.schema.js';
import ApplicationError from '../../error-handler/ApplicationError.js'

export default class FriendshipRepository {
    async getFriends(userId) {
        const user = await UserModel.findById(userId).populate({
            path: 'relationships.user',
            match: { 'relationships.status': 'accepted' },
            select: 'name email avatar'
        });
        return user.relationships.filter(rel => rel.status === 'accepted');
    }

    async getFriendRequests(userId) {
        const user = await UserModel.findById(userId).populate({
            path: 'relationships.user',
            match: { 'relationships.status': { $in: ['pending_incoming', 'pending_outgoing'] } },
            select: 'name email avatar'
        });
        return user.relationships.filter(rel => ['pending_incoming', 'pending_outgoing'].includes(rel.status));
    }

    async sendFriendRequest(senderId, receiverId) {
        const [sender, receiver] = await Promise.all([
            UserModel.findById(senderId),
            UserModel.findById(receiverId)
        ]);

        if (!receiver) {
            throw new ApplicationError('Receiver not found', 404);
        }

        const existingRelationship = sender.relationships.find(rel => rel.user.toString() === receiverId);
        if (existingRelationship) {
            throw new ApplicationError('Relationship already exists', 400);
        }

        sender.relationships.push({ user: receiverId, status: 'pending_outgoing' });
        receiver.relationships.push({ user: senderId, status: 'pending_incoming' });

        await Promise.all([sender.save(), receiver.save()]);
    }

    async acceptFriendRequest(userId, friendId) {
        const [user, friend] = await Promise.all([
            UserModel.findById(userId),
            UserModel.findById(friendId)
        ]);

        const userRelationship = user.relationships.find(rel => rel.user.toString() === friendId && rel.status === 'pending_incoming');
        const friendRelationship = friend.relationships.find(rel => rel.user.toString() === userId && rel.status === 'pending_outgoing');

        if (!userRelationship || !friendRelationship) {
            throw new ApplicationError('Friend request not found', 404);
        }

        userRelationship.status = 'accepted';
        friendRelationship.status = 'accepted';

        await Promise.all([user.save(), friend.save()]);
    }

    async rejectFriendRequest(userId, friendId) {
        const [user, friend] = await Promise.all([
            UserModel.findById(userId),
            UserModel.findById(friendId)
        ]);

        user.relationships = user.relationships.filter(rel => rel.user.toString() !== friendId);
        friend.relationships = friend.relationships.filter(rel => rel.user.toString() !== userId);

        await Promise.all([user.save(), friend.save()]);
    }

    async cancelFriendRequest(userId, friendId) {
        const [user, friend] = await Promise.all([
            UserModel.findById(userId),
            UserModel.findById(friendId)
        ]);

        user.relationships = user.relationships.filter(rel => rel.user.toString() !== friendId);
        friend.relationships = friend.relationships.filter(rel => rel.user.toString() !== userId);

        await Promise.all([user.save(), friend.save()]);
    }

    async removeFriend(userId, friendId) {
        const [user, friend] = await Promise.all([
            UserModel.findById(userId),
            UserModel.findById(friendId)
        ]);

        user.relationships = user.relationships.filter(rel => rel.user.toString() !== friendId);
        friend.relationships = friend.relationships.filter(rel => rel.user.toString() !== userId);

        await Promise.all([user.save(), friend.save()]);
    }

    async blockUser(userId, blockedId) {
        const [user, blocked] = await Promise.all([
            UserModel.findById(userId),
            UserModel.findById(blockedId)
        ]);

        // Remove any existing relationship
        user.relationships = user.relationships.filter(rel => rel.user.toString() !== blockedId);
        blocked.relationships = blocked.relationships.filter(rel => rel.user.toString() !== userId);

        // Add blocked relationship
        user.relationships.push({ user: blockedId, status: 'blocked' });

        await Promise.all([user.save(), blocked.save()]);
    }

    async unblockUser(userId, unblockedId) {
        const user = await UserModel.findById(userId);
        user.relationships = user.relationships.filter(rel => rel.user.toString() !== unblockedId);
        await user.save();
    }

    async getBlockedUsers(userId) {
        const user = await UserModel.findById(userId).populate({
            path: 'relationships.user',
            match: { 'relationships.status': 'blocked' },
            select: 'name email avatar'
        });
        return user.relationships.filter(rel => rel.status === 'blocked');
    }

    async getFriendshipStatus(userId, otherUserId) {
        const user = await UserModel.findById(userId);
        const relationship = user.relationships.find(rel => rel.user.toString() === otherUserId);
        return relationship ? relationship.status : 'none';
    }

    async getSuggestedFriends(userId) {
        const user = await UserModel.findById(userId);
        const friendIds = user.relationships
            .filter(rel => rel.status === 'accepted')
            .map(rel => rel.user.toString());

        const suggestedFriends = await UserModel.aggregate([
            { $match: { _id: { $nin: [...friendIds, userId] } } },
            { $sample: { size: 10 } },
            { $project: { name: 1, email: 1, avatar: 1 } }
        ]);

        return suggestedFriends;
    }
}