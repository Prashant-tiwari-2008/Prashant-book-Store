import express from 'express';
import { register, login, logout, getProfile } from '../controllers/userController';

// todo : need to add middle ware verify tokem
const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.post("/logout", verifyToken, logout);
routes.get("/profile/:id", verifyToken, getProfile)
export default routes;

//  some additional routes that can be useful for authentication:

// routes.post("/forgot-password", forgotPassword);  
// routes.post("/reset-password/:token", resetPassword);  

// Email Verification:
// routes.post("/verify-email", verifyEmail); 
// routes.get("/resend-verification", resendVerificationEmail);

// Refresh Tokens (JWT): If you're using JWT for authentication, adding a route to refresh tokens would be useful. This allows the user to maintain their session without logging in again.
routes.post("/refresh-token", refreshToken);

// Logout is typically done via a POST request, not GET, because the action modifies the state of the user session (revokes tokens, etc.). Changing logout to POST ensures this conforms to best practices.