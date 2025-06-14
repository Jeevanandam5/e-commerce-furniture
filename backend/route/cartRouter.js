import express from "express";
import {addToCart, getCart} from "../controller/cartController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();


router.route("/").post(protect, addToCart).get(protect, getCart);

export default router;