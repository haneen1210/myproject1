import { Router  } from "express";
import * as orderCotroller from './order.controller.js';
import { auth } from "../../middleware/auth.js";
import { endponts } from "./order.endpoint.js";

const router =Router();


router.post('/',auth(endponts.create),orderCotroller.createOrder);


export default router;