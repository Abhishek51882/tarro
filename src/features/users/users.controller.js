import UserModel from "./users.schema.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./users.repository.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res, next) {
        try {
            const { name, email, password, gender } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new UserModel({ name, email, password: hashedPassword, gender });
            await this.userRepository.signUp(user);
            console.log(`User ${email} signed up successfully`);
            res.status(201).send(user);
        } catch (err) {
            console.error(`Error signing up user: ${err.message}`);
            next(err);
        }
    }

    async signIn(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res.status(400).send("Incorrect credentials");
            }
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                return res.status(400).send("Incorrect credentials");
            }
            const token = jwt.sign({
                userId: user._id,
                email: user.email,
                name: user.name
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            user.tokens.push({ token });
            await user.save();
            console.log(`User ${email} signed in successfully`);
            res.status(200).send({ token });
        } catch (err) {
            console.error(`Error signing in user: ${err.message}`);
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            const user = await this.userRepository.findById(req.userId);
            user.tokens = user.tokens.filter(token => token.token !== req.token);
            await user.save();
            console.log(`User ${user.email} logged out successfully`);
            res.status(200).send("Logged out successfully");
        } catch (err) {
            console.error(`Error logging out user: ${err.message}`);
            next(err);
        }
    }

    async logoutAllDevices(req, res, next) {
        try {
            const user = await this.userRepository.findById(req.userId);
            user.tokens = [];
            await user.save();
            console.log(`User ${user.email} logged out from all devices successfully`);
            res.status(200).send("Logged out from all devices successfully");
        } catch (err) {
            console.error(`Error logging out user from all devices: ${err.message}`);
            next(err);
        }
    }

    async getUserDetails(req, res, next) {
        try {
            const user = await this.userRepository.findById(req.params.userId);
            res.status(200).send(user);
        } catch (err) {
            console.error(`Error getting user details: ${err.message}`);
            next(err);
        }
    }

    async getAllUserDetails(req, res, next) {
        try {
            const users = await this.userRepository.findAll();
            res.status(200).send(users);
        } catch (err) {
            console.error(`Error getting all user details: ${err.message}`);
            next(err);
        }
    }

    async updateUserDetails(req, res, next) {
        try {
            const user = await this.userRepository.updateUser(req.params.userId, req.body);
            res.status(200).send(user);
        } catch (err) {
            console.error(`Error updating user details: ${err.message}`);
            next(err);
        }
    }
}