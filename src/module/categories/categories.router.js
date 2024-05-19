import { Router } from "express";
import * as categoriescontroller from './categories.controller.js';
import fileUpload, { fileValidation } from "../../services/muter.js";
import subcategoryRouter from './../subcategory/subcategory.router.js';
import { auth, roles } from "../../middleware/auth.js";
import { endPoint } from "./category.endpont.js";
import { validation } from "../../middleware/validation .js";
import * as validators from './category.validation.js';

const router =Router();
router.use('/:id/subcategory',subcategoryRouter)
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(validators.createCategory),categoriescontroller.createcategories)
router.get('/',categoriescontroller.getcategories)
router.get('/active',auth(Object.values(roles)),categoriescontroller.getActiveCategory)
router.get('/:id',auth(endPoint.specific),validation(validators.getspecificCategory),categoriescontroller.getspecificCategory)
router.put('/:id',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),categoriescontroller.updateCategory)
export default router;


//auth(Object.values(roles) عشان اسمح للجميع يدخل سواء ادمن يوزر سوبر 
