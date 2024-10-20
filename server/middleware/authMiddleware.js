import jwt from 'jsonwebtoken';
import errorHandler from './errorHandler.js';
import User from '../models/User.js';

export const validateToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, "Unauthorized : token is not present"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "User not found."
            });
        }

        // Attach user and role information to the request
        req.user = {
            id: user._id,
            role: user.role  // Fetch role from the database
        };
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            statusCode: 403,
            message: "Invalid token. Unauthorized."
        });
    }
}