import OTPModel from "./otp.schema.js";
import UserModel from "../users/users.schema.js";

export default class OTPRepository {
    async saveOTP(email, otp,timestamp) {
        const otpEntry = new OTPModel({ email, otp,timestamp });
        await otpEntry.save();
    }

    async verifyOTP(email, otp) {
        const otpRecord = await OTPModel.findOne({ email, otp });
        if (!otpRecord) {
            return false;
        }

        const currentTime = Date.now();
        const otpTime = otpRecord.timestamp;
        const timeDifference = (currentTime - otpTime) / 1000 / 60; // Convert to minutes

        if (timeDifference > 2) {
            return false; // OTP is expired
        }

        return true; // OTP is valid

    }

    async resetPassword(email, hashedPassword) {
        await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });
    }
}