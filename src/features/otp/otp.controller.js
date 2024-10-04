import OTPRepository from "./otp.repository.js";
import { sendEmail } from "../../middlewares/email.middleware.js";
import bcrypt from 'bcrypt';
import emailQueue from "../../middlewares/emailQueue.middleware.js";

export default class OTPController {
    constructor() {
        this.otpRepository = new OTPRepository();
    }

    async sendOTP(req, res, next) {
        try {
            const {email}  = req.body;
            console.log('email',email);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const timestamp = Date.now(); // Store the current timestamp

            // Save OTP and timestamp to the repository
            await this.otpRepository.saveOTP(email, otp, timestamp);

            // Send OTP via email
            setTimeout(async()=>{
                await sendEmail(email, 'Your OTP Code', `Your OTP code is ${otp}`);
            },0)
           
            res.status(200).send("OTP sent successfully");
        } catch (err) {
            console.log('error',err)
            next(err);
        }
    }

    // async sendOTP(req, res, next) {
    //     try {
    //         const { email } = req.body;
    //         console.log('email', email);
    //         const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //         const timestamp = Date.now(); // Store the current timestamp

    //         // Save OTP and timestamp to the repository
    //         await this.otpRepository.saveOTP(email, otp, timestamp);

    //         // Add email sending task to the queue
    //         emailQueue.add({
    //             email,
    //             subject: 'Your OTP Code',
    //             text: `Your OTP code is ${otp}`
    //         });

    //         res.status(200).send("OTP sent successfully");
    //     } catch (err) {
    //         console.log('error', err);
    //         next(err);
    //     }
    // }


    async verifyOTP(req, res, next) {
        try {
            const { email, otp } = req.body;
            const isValid = await this.otpRepository.verifyOTP(email, otp);
            if (isValid) {
                res.status(200).send("OTP verified successfully");
            } else {
                res.status(400).send("Invalid OTP");
            }
        } catch (err) {
            console.log('error', err);
            next(err);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { email, newPassword } = req.body;
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            await this.otpRepository.resetPassword(email, hashedPassword);
            res.status(200).send("Password reset successfully");
        } catch (err) {
            next(err);
        }
    }
}