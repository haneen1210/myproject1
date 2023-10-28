import { Router } from "express";
import * as categoriescontroller from './categories.controller.js';
import fileUpload, { fileValidation } from "../../services/muter.js";
const router =Router();

router.get('/',categoriescontroller.getcategories)
router.post('/',fileUpload(fileValidation.image).single('image'),categoriescontroller.createcategories)


export default router;