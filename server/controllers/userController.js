import errorHandler from '../middleware/errorHandler.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            next(errorHandler(400, 'Required data missing'));
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                statusCode: 409,
                message: "Email is alreday in use!, Please Login"
            })
        }
        if (role === 'admin') {
            return res.status(409).json({
                success: false,
                statusCode: 409,
                message: "You can not assign admin role"
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

        const token = jwt.sign({ id: validUser._id }, process.env.JWTSECRET, { expiresIn: "10 day" });

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

export const verifyToken = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Token is valid"
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

export const resetPassword = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.userId && req.user.role === 'admin') {
            return next(errorHandler(403, "You are not allowe to access this data"));
        }
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return next(errorHandler(404, "User not found"));

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) return next(errorHandler(400, "Current password is incorrect"));
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Password changed successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const verifyEmail = (req, res, next) => {

}

export const resendVerificationEmail = (req, res, next) => {

}

export const refreshToken = (req, res, next) => {

}

export const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id; // extract user id form decoded token
        const idToFetch = req.user.role === 'admin' && req.query.userId ? req.query.userId : userId
        const user = await User.findById(idToFetch)
            .select('-password') // exclude password form response
            .populate('wishList','title author price') // populate wishlist directly
            .populate({
                path : 'cartList.bookId', // populate BookId inside carlist
                model :"Book", // specify the model
                select: "title ThumbnailURL author retail_price selling_price discount" // Only fetch required fields
            })
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export const editUserProfile = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.userId && req.user.role === 'admin') {
            return next(errorHandler(403, "You are not allowe to access this data"));
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.userId)
        console.log("updatedUser", updatedUser)
        console.log("updatedUser doc", updatedUser._doc)
        const { password, ...userWithoutPassword } = updatedUser._doc; // todo : what is _doc
        res.status(200).json({
            success: true,
            statusCode: 200,
            data: {
                message: "Profile updated successfully",
                userWithoutPassword
            }
        })
    } catch (error) {
        next(error);
    }
}

export const addToWishList = async (req, res, next) => {
    try {
        let { bookId } = req.body;
        const updatedData = await User.findByIdAndUpdate(req.user.id,
            { $addToSet: { wishList: bookId } },
            { new: true }
        )

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: {
                messae: "item added to wishList successfully",
                wishList: updatedData.wishList
            }
        })
    } catch (error) {
        next(error)
    }
}

export const removeFromWishList = async (req, res, next) => {
    try {
        let { bookId } = req.body;
        const updatedData = await User.findByIdAndUpdate(req.user.id,
            { $pull: { wishList: bookId } },
            { new: true }
        )

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: {
                message: "item removed from wishlist successfully",
                wishlist: updatedData
            }
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUserProfile = async (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
        return next(errorHandler(403, 'You are not allowed to delete this user'));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'User has been deleted'
        })
    } catch (error) {
        next(error)
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        })
        const totalUsers = await User.countDocuments();
        res.status(200).json({
            success: true,
            statusCode: 200,
            data: {
                count: totalUsers,
                user: usersWithoutPassword
            }
        })

    } catch (error) {
        next(error);
    }
}

export const addToCart = async (req, res, next) => {
    try {
        let { bookId, quantity } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const cartItem = user.cartList.find((item) => item.bookId === bookId);
        if (cartItem) {
            cartItem.quantity += quantity ?? 1;
        } else {
            user.cartList.push({ bookId, quantity: quantity || 1 })
        }
        await user.save();

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: {
                messae: "item added to wishList successfully",
                cartList: updatedData.cartList
            }
        })
    } catch (error) {
        next(error)
    }
}

export const removeFromCart = async (req, res, next) => {
    try {
        let { bookId } = req.body;
        const updatedData = await User.findByIdAndUpdate(req.user.id,
            { $pull: { cartList: bookId } },
            { new: true }
        )

        res.status(200).json({
            success: true,
            statusCode: 200,
            data: {
                message: "item removed from Cart list successfully",
                cartList: updatedData
            }
        })
    } catch (error) {
        next(error)
    }
}


// addition controller need to create
// Reduce Item Count: PUT /api/v1/cart/reduce/:bookId
// Clear Cart: DELETE /api/v1/cart

// Checkout Validation: POST /api/v1/cart/validate
// Validate the cart before checkout.

