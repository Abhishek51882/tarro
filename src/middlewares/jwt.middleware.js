import jwt from 'jsonwebtoken';
import UserModel from '../features/users/users.schema.js';
import dotenv from 'dotenv';
dotenv.config();


const jwtAuth = async (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(401).send("Unauthorized: No token provided");
    }


    try {
        console.log(process.env.JWT_SECRET);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        const user = await UserModel.findById(payload.userId);

        if (!user) {
            return res.status(401).send("Unauthorized: User not found");
        }

        const tokenExists = user.tokens.some(t => t.token === token);
        if (!tokenExists) {
            return res.status(401).send("Unauthorized: Token not found");
        }
        console.log('payload ',payload);
        req.userId = payload.userId;
        req.name = payload.name
        req.email = payload.email
        req.token = token; // Pass the token along with the request
        next();
    } catch (err) {
        return res.status(401).send("Unauthorized: Invalid token sorry");
    }
};

export default jwtAuth;