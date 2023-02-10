import express from "express";
import {
  getPayment,
  createPayment,
  getPayments,
} from "../controllers/payments";
import { Authentication } from "../middlewares/authentication";
import { Authorization } from "../middlewares/authorization";
const router: any = express.Router({ mergeParams: true });

router.get("/:id", Authentication, getPayment);
router.post("/", createPayment);
router.get("/", Authentication, Authorization(["admin"]), getPayments);

export default router;
