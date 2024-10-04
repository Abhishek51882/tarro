import CommentModel from "./comments.schema.js";
import CommentRepository from "./comments.repository.js";

export default class CommentController {
    constructor() {
        this.commentRepository = new CommentRepository();
    }

    async getCommentsByPostId(req, res, next) {
        try {
            const comments = await this.commentRepository.getCommentsByPostId(req.params.postId);
            console.log(`Fetched comments for post ID: ${req.params.postId}`);
            res.status(200).send(comments);
        } catch (err) {
            console.error(`Error fetching comments: ${err.message}`);
            next(err);
        }
    }

    async addComment(req, res, next) {
        try {
            const comment = new CommentModel({ ...req.body, user: req.userId, post: req.params.postId });
            await this.commentRepository.addComment(comment);
            console.log(`Added comment for post ID: ${req.params.postId}`);
            res.status(201).send(comment);
        } catch (err) {
            console.error(`Error adding comment: ${err.message}`);
            next(err);
        }
    }

    async updateComment(req, res, next) {
        try {
            const comment = await this.commentRepository.updateComment(req.params.commentId, req.body);
            console.log(`Updated comment with ID: ${req.params.commentId}`);
            res.status(200).send(comment);
        } catch (err) {
            console.error(`Error updating comment: ${err.message}`);
            next(err);
        }
    }

    async deleteComment(req, res, next) {
        try {
            await this.commentRepository.deleteComment(req.params.commentId);
            console.log(`Deleted comment with ID: ${req.params.commentId}`);
            res.status(200).send("Comment deleted successfully");
        } catch (err) {
            console.error(`Error deleting comment: ${err.message}`);
            next(err);
        }
    }
}