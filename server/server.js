import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';// For rate limiting - create separte middle ware
import './config/db.config.js'

// Routes imports
import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import { limiter } from './middleware/rateLimitMiddleware.js';
import { validateToken } from './middleware/authMiddleware.js';
import { routesErrorHandler } from './middleware/errorHandler.js';
// import orderRoutes from './routes/orderRoutes.js';
// import { limiter } from './middleware/rateLimitMiddleware.js';

//app cre
const app = express();
const PORT = process.env.PORT || 4000;

//add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser());
app.use(limiter);


app.use("/api/v1/auth", authRoutes)
// app.use("/api/v1/user", userRoutes)
app.use("/api/v1/book", bookRoutes)
// app.use("/api/v1/order",validateToken, orderRoutes)

//Fallback for unmatched routes (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Api endpoint not found'
    })
})

// Centralized error handling middleware
app.use(routesErrorHandler);

//staring server
app.listen(PORT, () => {
    console.log(`server is running on port number ${PORT}`)
})