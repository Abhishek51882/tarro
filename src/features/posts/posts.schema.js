import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;