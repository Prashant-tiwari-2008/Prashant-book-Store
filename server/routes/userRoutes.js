import express from 'express';
import { validateToken } from '../middleware/authMiddleware.js';
import { validateAdminRole } from '../middleware/adminMiddleware.js';
import { getUserProfile, editUserProfile, deleteUserProfile, getAllUser, addToWishList } from '../controllers/userController.js'
import { validateUserData } from '../middleware/validationMiddleware.js';

const routes = express.Router();

routes.get("/profile", validateToken, getUserProfile)
routes.put("/:id", validateToken, validateUserData, editUserProfile)
routes.delete("/:id", validateToken, deleteUserProfile)
routes.put("/addtowishlit/:id", validateToken, addToWishList)
// Admin-prfile
routes.get("/", validateToken, validateAdminRole, getAllUser)

export default routes