import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

const OTPModel = mongoose.model('OTP', otpSchema);

export default OTPModel;