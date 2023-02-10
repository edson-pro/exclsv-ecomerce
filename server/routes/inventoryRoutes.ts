import express from "express";
import {
  getInventory,
  updateInventory,
  getInventories,
} from "../controllers/inventory";
import { Authentication } from "../middlewares/authentication";
import { Authorization } from "../middlewares/authorization";
const router: any = express.Router();

router.get("/", Authentication, Authorization(["admin"]), getInventories);
router.get("/:id", Authentication, Authorization(["admin"]), getInventory);
router.patch("/:id", Authentication, Authorization(["admin"]), updateInventory);

export default router;
