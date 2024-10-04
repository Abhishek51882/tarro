import express from 'express';
import OTPController from './otp.controller.js';

const router = express.Router();
const otpController = new OTPController();

// OTP routes
router.post('/send', otpController.sendOTP.bind(otpController));
router.post('/verify', otpController.verifyOTP.bind(otpController));
router.post('/reset-password', otpController.resetPassword.bind(otpController));

export default router;