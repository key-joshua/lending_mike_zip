import { Router } from "express";
import { adminController } from "../controllers";
import auth from "../middlewares/auth";

const router = Router();

router.get("/users", auth("users"), adminController.getUsers);

router.post("/suspend", auth("users"), adminController.suspendUsers);
router.post("/delete", auth("users"), adminController.deleteUsers);
router.get(
  "/dashboard-counts",
  auth("dashboard"),
  adminController.getDashboardCounts
);

router.get("/dashboard", auth("dashboard"), adminController.getDasboardGraph);

export default router;
