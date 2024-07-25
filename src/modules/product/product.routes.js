import { Router } from "express";
import * as products from "./product.controller.js";

const router = Router();

router.post('/addproduct',products.addProduct)
router.get('/totalRevenue',products.totalRevenue);
router.get('/totalNoOfProduct',products.totalNoOfProduct);
export default router;