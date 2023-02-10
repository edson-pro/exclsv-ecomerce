import express from "express";
import {
  getDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  removeDiscount,
  getDiscounts,
  getDiscountUsages,
  applyDiscount,
} from "../controllers/discounts";
import { Authentication } from "../middlewares/authentication";
import { Authorization } from "../middlewares/authorization";
import Validator from "../middlewares/Validator";
const router: any = express.Router();

router.get("/:id", getDiscount);
router.post(
  "/",
  Authentication,
  Validator("discount"),
  Authorization(["admin"]),
  createDiscount
);
router.patch(
  "/:id",
  Validator("discount"),
  Authentication,
  Authorization(["admin"]),
  updateDiscount
);
router.delete("/:id", Authentication, Authorization(["admin"]), deleteDiscount);
router.get(
  "/:id/usages",
  Authentication,
  Authorization(["admin"]),
  Authentication,
  getDiscountUsages
);
router.post("/:code/apply", Authentication, applyDiscount);
router.delete("/:id/remove", Authentication, removeDiscount);
router.get(
  "/",
  Authentication,
  Authorization(["admin"]),
  Authentication,
  getDiscounts
);

export default router;
