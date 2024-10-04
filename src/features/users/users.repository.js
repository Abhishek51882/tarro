import UserModel from "./users.schema.js";

export default class UserRepository {
    async signUp(user) {
        return await user.save();
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async findById(userId) {
        return await UserModel.findById(userId);
    }

    async findAll() {
        return await UserModel.find().select('-password -tokens');
    }

    async updateUser(userId, userData) {
        return await UserModel.findByIdAndUpdate(userId, userData, { new: true }).select('-password -tokens');
    }
}