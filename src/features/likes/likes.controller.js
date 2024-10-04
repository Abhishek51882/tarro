import LikeModel from "./likes.schema.js";
import LikeRepository from "./likes.repository.js";

export default class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
    }

    async getLikes(req, res, next) {
        try {
            const likes = await this.likeRepository.getLikes(req.params.id);
            console.log(`Fetched likes for ID: ${req.params.id}`);
            res.status(200).send(likes);
        } catch (err) {
            console.error(`Error fetching likes: ${err.message}`);
            next(err);
        }
    }

    async toggleLike(req, res, next) {
        try {
            const {onModel} = req.body;
      
            const like = await this.likeRepository.toggleLike(req.params.id, req.userId,onModel);
            
           
            console.log(`Toggled like for ID: ${req.params.id}`);
            res.status(200).send(like);
        } catch (err) {
            console.error(`Error toggling like: ${err.message}`);
            next(err);
        }
    }
}