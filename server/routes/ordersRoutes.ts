import express from "express";
import {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
} from "../controllers/orders";
import { Authentication } from "../middlewares/authentication";
import { Authorization } from "../middlewares/authorization";
import Validator from "../middlewares/Validator";
const router: any = express.Router();

router.get("/:id", Authentication, getOrder);
router.post("/", Validator("order"), Authentication, createOrder);
router.patch(
  "/:id",
  Validator("order"),
  Authentication,
  Authorization(["admin"]),
  updateOrder
);
router.delete("/:id", Authentication, Authorization(["admin"]), deleteOrder);
router.get("/", Authentication, Authorization(["admin"]), getOrders);

export default router;
