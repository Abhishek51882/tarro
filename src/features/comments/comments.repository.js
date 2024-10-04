import CommentModel from "./comments.schema.js";

export default class CommentRepository {
    async getCommentsByPostId(postId) {
        return await CommentModel.find({ post: postId }).populate('user', 'name email');
    }

    async addComment(comment) {
        return await comment.save();
    }

    async updateComment(commentId, commentData) {
        return await CommentModel.findByIdAndUpdate(commentId, commentData, { new: true });
    }

    async deleteComment(commentId) {
        return await CommentModel.findByIdAndDelete(commentId);
    }
}