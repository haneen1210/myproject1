import { Router  } from "express";
import * as subCategoriesController from './subcategory.controller.js';
import fileUpload, { fileValidation } from "../../services/muter.js";
const router =Router({mergeParams:true});

router.post('/',fileUpload(fileValidation.image).single('image'),subCategoriesController.createSubcategory)
router.get('/',subCategoriesController.getSubCategories)
export default router;