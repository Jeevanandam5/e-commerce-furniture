import express from "express"
import { getProduct , getProductId } from "../controller/productController.js";
// import products from "../data/products.js";

const router = express.Router();

router.route('/').get(getProduct);

router.route('/:id').get(getProductId);

export default router