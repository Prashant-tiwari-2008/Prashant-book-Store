import jwt from 'jsonwebtoken';
import errorHandler from './errorHandler.js';

export const validateToken = async (req, res, next) => {
    const token = req.cookies.accesss_token;

    if (!token) {
        console.log("Token is not present");
        return next(errorHandler(401, "Unauthorized : token is not present"));
    }
    jwt.verify(token, process.env.JWTSECRET, (err, user) => {
        if (err) {
            console.log("token is not right");
            return next(errorHandler(401, 'Unauthorized : ${err}'))
        }
        req.user = user;
        next();
    })
}