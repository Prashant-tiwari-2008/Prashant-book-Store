import express from 'express';
import { validateToken } from '../middleware/authMiddleware.js';
import { validateAdminRole } from '../middleware/adminMiddleware.js';
import { getUserProfile, editUserProfile, deleteUserProfile, getAllUser } from '../controllers/userController.js'
import { validateUserData } from '../middleware/validationMiddleware.js';

const routes = express.Router();

routes.get("/:id", validateToken, getUserProfile)
routes.put("/:id", validateToken, validateUserData,editUserProfile)
routes.delete("/:id", validateToken, deleteUserProfile)

// Admin-prfile
routes.get("/", validateToken, validateAdminRole, getAllUser)

export default routes