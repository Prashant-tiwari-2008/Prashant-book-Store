import express from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder, getUserOrders } from "../controllers/orderController"
import verifyToken from '../middleware/authMiddleware';
import verifyAdminToken from '../middleware/adminMiddleware';

const routes = express.Router();

routes.post("/", verifyToken, createOrder);
routes.get("/my-orders", verifyToken, getUserOrders);
//Admin routes
routes.get("/", verifyAdminToken, getAllOrders);
routes.get("/:id", verifyAdminToken, getOrderById);
routes.put("/:id", verifyAdminToken, updateOrderStatus);
routes.delete("/:id", verifyAdminToken, deleteOrder);

export default routes