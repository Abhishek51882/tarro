import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth :{
        user:'av51882@gmail.com',
        pass:'lyvi wzwr gcqw ohrr'
    }
});

export const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
};