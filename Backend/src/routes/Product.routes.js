import {Router } from "express"
import { productController } from "../controllers/Product.controller.js"

const router = Router();    

router.get('/seed', productController.seedDatabase);
router.get('/alldata', productController.getAllData);

export default router;
