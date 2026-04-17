import { Router } from "express";
import { loginUser, logoutUser, RegisterUser } from "../controllers/user.controller.ts";


const router = Router();

router.route('/register').post(RegisterUser);
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)

export default router