// friendship.controller.js
import FriendshipRepository from './friendship.repository.js';

export default class FriendshipController {
    constructor() {
        this.friendshipRepository = new FriendshipRepository();
    }

    getFriends = async (req, res, next) => {
        try {
            const friends = await this.friendshipRepository.getFriends(req.params.userId);
            res.status(200).json(friends);
        } catch (error) {
            next(error);
        }
    }

    getFriendRequests = async (req, res, next) => {
        try {
            const requests = await this.friendshipRepository.getFriendRequests(req.userId);
            res.status(200).json(requests);
        } catch (error) {
            next(error);
        }
    }

    sendFriendRequest = async (req, res, next) => {
        try {
            await this.friendshipRepository.sendFriendRequest(req.userId, req.params.userId);
            res.status(200).json({ message: 'Friend request sent successfully' });
        } catch (error) {
            next(error);
        }
    }

    acceptFriendRequest = async (req, res, next) => {
        try {
            await this.friendshipRepository.acceptFriendRequest(req.userId, req.params.userId);
            res.status(200).json({ message: 'Friend request accepted' });
        } catch (error) {
            next(error);
        }
    }

    rejectFriendRequest = async (req, res, next) => {
        try {
            await this.friendshipRepository.rejectFriendRequest(req.userId, req.params.userId);
            res.status(200).json({ message: 'Friend request rejected' });
        } catch (error) {
            next(error);
        }
    }

    cancelFriendRequest = async (req, res, next) => {
        try {
            await this.friendshipRepository.cancelFriendRequest(req.userId, req.params.userId);
            res.status(200).json({ message: 'Friend request cancelled' });
        } catch (error) {
            next(error);
        }
    }

    removeFriend = async (req, res, next) => {
        try {
            await this.friendshipRepository.removeFriend(req.userId, req.params.userId);
            res.status(200).json({ message: 'Friend removed successfully' });
        } catch (error) {
            next(error);
        }
    }

    blockUser = async (req, res, next) => {
        try {
            await this.friendshipRepository.blockUser(req.userId, req.params.userId);
            res.status(200).json({ message: 'User blocked successfully' });
        } catch (error) {
            next(error);
        }
    }

    unblockUser = async (req, res, next) => {
        try {
            await this.friendshipRepository.unblockUser(req.userId, req.params.userId);
            res.status(200).json({ message: 'User unblocked successfully' });
        } catch (error) {
            next(error);
        }
    }

    getBlockedUsers = async (req, res, next) => {
        try {
            const blockedUsers = await this.friendshipRepository.getBlockedUsers(req.userId);
            res.status(200).json(blockedUsers);
        } catch (error) {
            next(error);
        }
    }

    getFriendshipStatus = async (req, res, next) => {
        try {
            const status = await this.friendshipRepository.getFriendshipStatus(req.userId, req.params.userId);
            res.status(200).json(status);
        } catch (error) {
            next(error);
        }
    }

    getSuggestedFriends = async (req, res, next) => {
        try {
            const suggestions = await this.friendshipRepository.getSuggestedFriends(req.userId);
            res.status(200).json(suggestions);
        } catch (error) {
            next(error);
        }
    }
}