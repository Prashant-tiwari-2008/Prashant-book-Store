import express from 'express';
import { postBook, postBooks, getAllBooks, getSingleBook, UpdateBook, deleteBook, searchBooks } from '../controllers/bookController.js';
// import verifyAdminToken from '../middleware/adminMiddleware.js';

const routes = express.Router();
//public routes
routes.get("/", getAllBooks);
routes.get("/:id", getSingleBook);
routes.get("/search", searchBooks);

//Admin-protected routes
routes.post("/createBooks", postBooks)
// routes.post("/", verifyAdminToken, postBook);
// routes.put("/:id", verifyAdminToken, UpdateBook)
// routes.delete("/:id", verifyAdminToken, deleteBook)
routes.post("/", postBook);
routes.put("/:id", UpdateBook)
routes.delete("/:id", deleteBook)

//todo :  Pagination need to  add
export default routes;