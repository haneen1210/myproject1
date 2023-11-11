import { Router  } from "express";
import * as couponCotroller from './coupon.controller.js';
const router =Router();


router.post('/',couponCotroller.createCoupon);
router.get('/',couponCotroller.getCoupon);
router.put('/:id',couponCotroller.updateCoupon);

router.patch('/softDeleted/:id',couponCotroller.softDelet);
router.delete('/hrddDeleted/:id',couponCotroller.hardDeleted);
router.patch('/restore/:id',couponCotroller.restore);


export default router;