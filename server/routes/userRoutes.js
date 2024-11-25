import express from 'express';
import { validateToken } from '../middleware/authMiddleware.js';
import { validateAdminRole } from '../middleware/adminMiddleware.js';
import { getUserProfile, editUserProfile, deleteUserProfile, getAllUser, addToWishList, removeFromWishList,addToCart, removeFromCart } from '../controllers/userController.js'
import { validateUserData } from '../middleware/validationMiddleware.js';

const routes = express.Router();

routes.get("/", validateToken, getUserProfile)
routes.put("/", validateToken, validateUserData, editUserProfile)
routes.delete("/", validateToken, deleteUserProfile)
routes.put("/addtowishlit", validateToken, addToWishList)
routes.put("/removeFromWishList", validateToken, removeFromWishList)
routes.put("/addToCart", validateToken, addToCart)
routes.put("/removeFromCart", validateToken, removeFromCart)

// Admin-prfile
routes.get("/admin/", validateToken, validateAdminRole, getAllUser)
routes.put("/admin/editUser/:id", validateToken, validateAdminRole, editUserProfile);
routes.delete("/admin/deleteUser/:id", validateToken, validateAdminRole, deleteUserProfile);

export default routes