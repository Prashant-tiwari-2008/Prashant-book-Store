import rateLimit from 'express-rate-limit';

//  Rate limiting middleware - create separetly
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,  // limit each IP to 100 requests per windowMs,
    message: 'Too many login attempts from this IP, please try again after a minute'

});


//limit Login request to login to 5 per mint
export const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts from this IP, please try again after a minute'
})