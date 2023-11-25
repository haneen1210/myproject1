import { Router } from "express";
import * as AuthController from './auth.controller.js';
import fileUpload, { fileValidation } from "../../services/muter.js";

const router = Router();
router.post('/singup',fileUpload(fileValidation.image).single('image'),AuthController.sinUp);
router.post('/singin',AuthController.singIn);
router.get('/confimEmail/:token',AuthController.confimEmail)
router.patch('/sendCode',AuthController.sendCode)
router.patch('/forgotPassword',AuthController.forgotPassword)
export default router;


