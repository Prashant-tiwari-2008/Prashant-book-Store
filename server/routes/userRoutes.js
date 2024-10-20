import express from 'express';
import { validateToken } from '../middleware/authMiddleware.js';
import { validateAdminRole, validateSellerRole } from '../middleware/adminMiddleware.js';
import { getUserProfile, editUserProfile, deleteUserProfile, getAllUser } from '../controllers/userController.js'
import { validateUserRegister } from '../middleware/validationMiddleware.js';

const routes = express.Router();

routes.get("/:id", validateToken, getUserProfile)
routes.put("/:id", validateToken, validateUserRegister,editUserProfile)
routes.delete("/:id", validateToken, deleteUserProfile)

// Admin-prfile
routes.get("/", validateToken, validateAdminRole, getAllUser)

export default routes