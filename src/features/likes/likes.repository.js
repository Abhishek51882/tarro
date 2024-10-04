import LikeModel from "./likes.schema.js";

export default class LikeRepository {
    async getLikes(id) {
        return await LikeModel.find({ postOrComment: id }).populate('user', 'name email');
    }

    async toggleLike(id, userId,onModel) {
        const like = await LikeModel.findOne({ postOrComment: id, user: userId });
        if (like) {
            await LikeModel.findByIdAndDelete(like._id);
            return { message: "Like removed" };
        } else {
            const newLike = new LikeModel({ postOrComment: id, user: userId ,onModel});
            await newLike.save();
            return newLike;
        }
    }
}