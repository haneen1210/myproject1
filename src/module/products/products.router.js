/*import { Router } from "express";
const router =Router();

router.get('/products',(req,res)=>{
return res.json("products ....");

})

export default router;
*/

import { Router } from "express";
import * as productscontroller from './products.controller.js';
const router =Router();

router.get('/',productscontroller.getproducts)

export default router;