import express from "express";
import { getProducts, publishProduct } from "../controller/productController.js";

const router = express.Router();

router.get("/getProducts", getProducts);
router.post("/publishProduct", publishProduct);

export default router;