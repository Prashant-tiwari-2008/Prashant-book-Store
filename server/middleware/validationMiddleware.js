import { check, validationResult } from 'express-validator';

export const validateUserRegister = [
    check('firstName', 'Name is required').notEmpty(),
    check('email', 'Please incluede a valid email').isEmail(),
    check('password', 'Password should be at least 6 character long').isLength({ min: 6 }),
    check('phoneNumber', 'Phone Number is required').notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: errors.array()

            })
        }
        next();
    }
]

export const validateBookCreation = [
    check('title', 'Title is required').notEmpty(),
    check('author', 'Author is required').notEmpty(),
    // check('price', 'Price must be a number').isNumeric(),
    // check('stock', 'Stock must be a number').isInt({ min: 0 }),
    // check('category', 'Category is required').notEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: errors.array()
            })
        }
        next(); 
    }
];
