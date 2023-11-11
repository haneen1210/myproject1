import { Router } from "express";
import * as categoriescontroller from './categories.controller.js';
import fileUpload, { fileValidation } from "../../services/muter.js";
import subcategoryRouter from './../subcategory/subcategory.router.js';
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./category.endpont.js";
const router =Router();
router.use('/:id/subcategory',subcategoryRouter)
router.get('/',auth(endPoint.getAll),categoriescontroller.getcategories)
router.get('/active',auth(endPoint.getActive),categoriescontroller.getActiveCategory)
router.get('/:id',auth(endPoint.specific),categoriescontroller.getspecificCategory)
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),categoriescontroller.createcategories)
router.put('/:id',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),categoriescontroller.updateCategory)
export default router;