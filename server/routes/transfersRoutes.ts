import express from "express";
import {
  createTransfer,
  getTransfers,
  getTransfer,
  updateTransfer,
} from "../controllers/transfers";
import { Authentication } from "../middlewares/authentication";
import { Authorization } from "../middlewares/authorization";
import Validator from "../middlewares/Validator";
const router: any = express.Router();

router.post(
  "/",
  Authentication,
  Validator("transfer"),
  Authorization(["admin"]),
  createTransfer
);
router.get("/", Authentication, Authorization(["admin"]), getTransfers);
router.get("/:id", Authentication, Authorization(["admin"]), getTransfer);
router.patch(
  "/:id",
  Validator("transfer"),
  Authentication,
  Authorization(["admin"]),
  updateTransfer
);

export default router;
