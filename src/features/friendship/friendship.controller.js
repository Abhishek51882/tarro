import FriendshipModel from "./friendship.schema.js";
import FriendshipRepository from "./friendship.repository.js";

export default class FriendshipController {
    constructor() {
        this.friendshipRepository = new FriendshipRepository();
    }

    async getFriends(req, res, next) {
        try {
            const friends = await this.friendshipRepository.getFriends(req.params.userId);
            console.log(`Fetched friends for user ID: ${req.params.userId}`);
            res.status(200).send(friends);
        } catch (err) {
            console.error(`Error fetching friends: ${err.message}`);
            next(err);
        }
    }

    async getPendingRequests(req, res, next) {
        try {
            const requests = await this.friendshipRepository.getPendingRequests(req.userId);
            console.log(`Fetched pending requests for user ID: ${req.userId}`);
            res.status(200).send(requests);
        } catch (err) {
            console.error(`Error fetching pending requests: ${err.message}`);
            next(err);
        }
    }

    async toggleFriendship(req, res, next) {
        try {
            const friendship = await this.friendshipRepository.toggleFriendship(req.params.friendId, req.userId);
            console.log(`Toggled friendship for friend ID: ${req.params.friendId}`);
            res.status(200).send(friendship);
        } catch (err) {
            console.error(`Error toggling friendship: ${err.message}`);
            next(err);
        }
    }

    async respondToRequest(req, res, next) {
        try {
            console.log("entering respondToRequest ",req.params.friendId,req.body.accept)
            const response = await this.friendshipRepository.respondToRequest(req.params.friendId, req.body.accept);
            console.log(`Responded to friend request for friend ID: ${req.params.friendId}`);
            res.status(200).send(response);
        } catch (err) {
            console.error(`Error responding to friend request: ${err.message}`);
            next(err);
        }
    }
    async sendFriendRequest(req, res, next) {
        try {
            const friendship = await this.friendshipRepository.sendFriendRequest(req.userId, req.params.friendId);
            res.status(201).send(friendship);
        } catch (err) {
            next(err);
        }
    }
}