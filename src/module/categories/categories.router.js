import { Router } from "express";
import * as categoriescontroller from './categories.controller.js';
const router =Router();

router.get('/',categoriescontroller.getcategories)



export default router;