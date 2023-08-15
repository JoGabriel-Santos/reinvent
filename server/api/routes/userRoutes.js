import express from "express";
import { signin, signup, changeUserInfo } from "../controller/userController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.patch("/changeUserInfo", changeUserInfo);

export default router;