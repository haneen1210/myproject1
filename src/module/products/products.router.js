
import { Router } from "express";
import * as productscontroller from './products.controller.js';
const router =Router();

router.get('/',productscontroller.getproducts)

export default router;