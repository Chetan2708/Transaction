import {Router } from "express"
import { productController } from "../controllers/Product.controller.js"

const router = Router();    

router.get('/seed', productController.seedDatabase); // - To enter data into mongo 
router.get('/alldata', productController.getAllData); // - Single APi for all calculations

export default router;
