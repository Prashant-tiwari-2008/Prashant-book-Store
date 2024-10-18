import errorHandler from '../middleware/errorHandler.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            next(errorHandler(400, 'Required data missing'));
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                success: true,
                statusCode: 409,
                message: "Email is alreday in use!, Please Login"
            })
        }

        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User is created successfully!"
        })

    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found with this email'))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid Password"))
        }

        const token = jwt.sign({ id: validUser._id}, process.env.JWTSECRET, { expiresIn: "10 day" });

        // todo need to userstand
        const { password: pass, ...userWithoutPassword } = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true, // for dev
            // httpsOnly : true // for Prod
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // Protect against CSRF attacks
            maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days in milliseconds
        }).json({
            success: true,
            statusCode: 200,
            data: userWithoutPassword
        })
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json({
            success: true,
            statusCode: 200,
            message: 'Sign Out Successful.'
        })
    } catch (error) {
        next(error);
    }
}

export const forgotPassword = (req, res, next) => {

}

export const resetPassword = (req, res, next) => {

}

export const verifyEmail = (req, res, next) => {

}

export const resendVerificationEmail = (req, res, next) => {

}

export const refreshToken = (req, res, next) => {

}

// const user = await User.findById(decodedToken.id); 
// if (user.role !== 'admin') {
//    return res.status(403).json({ message: 'Access Denied' });
// }