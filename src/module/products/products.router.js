
import { Router } from "express";
import * as productscontroller from './products.controller.js';
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./products.endpont.js";
import fileUpload, { fileValidation } from "../../services/muter.js";


const router =Router();

router.get('/',productscontroller.getproducts)
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImage',maxCount:4},
]),productscontroller.createProduct)


router.get('/category/:categoryId',productscontroller.getproductsWithCAtegory)
router.get('/productId',productscontroller.getproduct)
export default router;