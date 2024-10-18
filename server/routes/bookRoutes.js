import express from 'express';
import { postBook, postBooks, getAllBooks, getSingleBook, UpdateBook, deleteBook, searchBooks } from '../controllers/bookController.js';
import { validateSellerRole } from '../middleware/adminMiddleware.js';
import { validateToken } from '../middleware/authMiddleware.js';
import { validateBookCreation } from '../middleware/validationMiddleware.js';


const routes = express.Router();
//public routes
routes.get("/", getAllBooks);
routes.get("/:id", getSingleBook);
routes.get("/search", searchBooks);

//Admin-protected routes
routes.post("/createBooks", validateToken, validateSellerRole, validateBookCreation, postBooks)
routes.post("/", validateToken, validateSellerRole, validateBookCreation, postBook);
routes.put("/:id", validateToken, validateSellerRole, validateBookCreation, UpdateBook)
routes.delete("/:id", validateToken, validateSellerRole, deleteBook)

export default routes;