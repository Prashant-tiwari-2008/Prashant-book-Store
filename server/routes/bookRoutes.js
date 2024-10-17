import express from 'express';
import { postBook, getAllBooks, getSingleBook, UpdateBook, deleteBook, searchBooks } from '../controllers/bookController';
import verifyAdminToken from '../middleware/adminMiddleware';

const routes = express.Router();

//public routes
routes.get("/", getAllBooks);
routes.get("/:id", getSingleBook);
routes.get("/search", searchBooks);

//Admin-protected routes
routes.post("/", verifyAdminToken, postBook);
routes.put("/:id", verifyAdminToken, UpdateBook)
routes.delete("/:id", verifyAdminToken, deleteBook)

//todo :  Pagination need to  add
export default routes;