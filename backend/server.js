import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRouter from "./route/productRouter.js";
import userRouter from "./route/userRouter.js";
import cartRoutes from "./route/cartRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://e-commerce-furniture-backend-9vxf.onrender.com',
  credentials: true,
}));

// Database connection
connectDB();

// Routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
