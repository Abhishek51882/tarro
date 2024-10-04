import PostModel from "./posts.schema.js";

export default class PostRepository {
    async getAllPosts() {
        return await PostModel.find().populate('user', 'name email');
    }

    async getPostById(postId) {
        return await PostModel.findById(postId).populate('user', 'name email');
    }

    async getUserPosts(userId) {
        return await PostModel.find({ user: userId }).populate('user', 'name email');
    }

    async createPost(post) {
        return await post.save();
    }

    async updatePost(postId, postData) {
        return await PostModel.findByIdAndUpdate(postId, postData, { new: true });
    }

    async deletePost(postId) {
        return await PostModel.findByIdAndDelete(postId);
    }
}