import { Router } from "express";
import * as AuthController from './auth.controller.js';
import fileUpload, { fileValidation } from "../../services/muter.js";
import { asynHandler } from "../../services/errorHanding.js";

const router = Router();
router.post('/singup',fileUpload(fileValidation.image).single('image'),asynHandler(AuthController.sinUp));
router.post('/singin',asynHandler(AuthController.singIn));
router.get('/confimEmail/:token',asynHandler(AuthController.confimEmail));
router.patch('/sendCode',asynHandler(AuthController.sendCode))
router.patch('/forgotPassword',asynHandler(AuthController.forgotPassword))
export default router;


