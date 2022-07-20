import { Router } from "express";
import { chatController } from "../controllers";
import auth from "../middlewares/auth";
const router = Router();

router.post("/", auth("chat"), chatController.createNewChat);

export default router;
