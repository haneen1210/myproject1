import { Router } from "express";
import * as categoriescontroller from './categories.controller.js';
import fileUpload, { fileValidation } from "../../services/muter.js";
const router =Router();

router.get('/',categoriescontroller.getcategories)
router.get('/active',categoriescontroller.getActiveCategory)
router.get('/:id',categoriescontroller.getspecificCategory)
router.post('/',fileUpload(fileValidation.image).single('image'),categoriescontroller.createcategories)
router.put('/:id',fileUpload(fileValidation.image).single('image'),categoriescontroller.updateCategory)
export default router;