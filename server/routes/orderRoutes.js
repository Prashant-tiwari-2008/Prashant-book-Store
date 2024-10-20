import express from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder, getUserOrders } from "../controllers/orderController.js"
import { validateToken } from '../middleware/authMiddleware.js';
import { validateAdminRole } from '../middleware/adminMiddleware.js';

const routes = express.Router();

routes.post("/", validateToken, createOrder);
routes.get("/my-orders", validateToken, getUserOrders);
//Admin routes
routes.get("/", validateAdminRole, getAllOrders);
routes.get("/:id", validateAdminRole, getOrderById);
routes.put("/:id", validateAdminRole, updateOrderStatus);
routes.delete("/:id", validateAdminRole, deleteOrder);

export default routes