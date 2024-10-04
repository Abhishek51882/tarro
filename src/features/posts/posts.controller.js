import PostModel from "./posts.schema.js";
import PostRepository from "./posts.repository.js";

export default class PostController {
    constructor() {
        this.postRepository = new PostRepository();
    }

    async getAllPosts(req, res, next) {
        try {
            const posts = await this.postRepository.getAllPosts();
            console.log("Fetched all posts");
            res.status(200).send(posts);
        } catch (err) {
            console.error(`Error fetching all posts: ${err.message}`);
            next(err);
        }
    }

    async getPostById(req, res, next) {
        try {
            const post = await this.postRepository.getPostById(req.params.postId);
            console.log(`Fetched post with ID: ${req.params.postId}`);
            res.status(200).send(post);
        } catch (err) {
            console.error(`Error fetching post by ID: ${err.message}`);
            next(err);
        }
    }

    async getUserPosts(req, res, next) {
        try {
            const posts = await this.postRepository.getUserPosts(req.params.userId);
            console.log(`Fetched posts for user ID: ${req.params.userId}`);
            res.status(200).send(posts);
        } catch (err) {
            console.error(`Error fetching user posts: ${err.message}`);
            next(err);
        }
    }

    async createPost(req, res, next) {
        try {
            const { caption } = req.body;
            console.log("file",req.file)
            const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
            const post = new PostModel({ caption, imageUrl, user: req.userId });
            await this.postRepository.createPost(post);
            res.status(201).send(post);
        } catch (err) {
            next(err);
        }
    }

    async updatePost(req, res, next) {
        try {
            const { caption } = req.body;
            const post = await this.postRepository.getPostById(req.params.postId);

            if (!post) {
                return res.status(404).send("Post not found");
            }

            if (req.file) {
                // Delete the old image file if it exists
                if (post.imageUrl) {
                    const oldImagePath = path.join(__dirname, '../../', post.imageUrl);
                    fs.unlink(oldImagePath, (err) => {
                        if (err) {
                            console.error(`Error deleting old image: ${err.message}`);
                        }
                    });
                }
                post.imageUrl = `/uploads/${req.file.filename}`;
            }

            post.caption = caption || post.caption;
            await post.save();

            res.status(200).send(post);
        } catch (err) {
            console.error(`Error updating post: ${err.message}`);
            next(err);
        }
    }

    async deletePost(req, res, next) {
        try {
            await this.postRepository.deletePost(req.params.postId);
            console.log(`Deleted post with ID: ${req.params.postId}`);
            res.status(200).send("Post deleted successfully");
        } catch (err) {
            console.error(`Error deleting post: ${err.message}`);
            next(err);
        }
    }
}