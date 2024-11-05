import express from 'express';
import { register, login, verifyToken, logout, forgotPassword, resetPassword, verifyEmail, resendVerificationEmail, refreshToken } from '../controllers/userController.js';
import { validateToken } from '../middleware/authMiddleware.js';
import { loginLimiter } from '../middleware/rateLimitMiddleware.js';
import { validateUserData } from '../middleware/validationMiddleware.js';

const routes = express.Router();

routes.post("/signup", validateUserData, register);
routes.post("/login", loginLimiter, login);
routes.get("/verifyToken", validateToken, verifyToken);
routes.post("/signout", validateToken, logout);
routes.post("/forgot-password", forgotPassword);
routes.post("/reset-password/:token", resetPassword);
routes.post("/verify-email", verifyEmail);
routes.get("/resend-verification", resendVerificationEmail);
routes.post("/refresh-token", refreshToken);

export default routes;

// Refresh Tokens (JWT): If you're using JWT for authentication, adding a route to refresh tokens would be useful. This allows the user to maintain their session without logging in again.

// Logout is typically done via a POST request, not GET, because the action modifies the state of the user session (revokes tokens, etc.). Changing logout to POST ensures this conforms to best practices.