import express from "express";
import {
  getSupplier,
  updateSupplier,
  deleteSupplier,
  createSupplier,
  getSuppliers,
} from "../controllers/suppliers";
import { Authentication } from "../middlewares/authentication";
import { Authorization } from "../middlewares/authorization";
import Validator from "../middlewares/Validator";
const router: any = express.Router();

router.get("/:id", Authentication, Authorization(["admin"]), getSupplier);
router.patch(
  "/:id",
  Validator("supplier"),
  Authentication,
  Authorization(["admin"]),
  updateSupplier
);
router.delete(
  "/:id",
  Validator("supplier"),
  Authentication,
  Authorization(["admin"]),
  deleteSupplier
);
router.post("/", Authentication, Authorization(["admin"]), createSupplier);
router.get("/", Authentication, Authorization(["admin"]), getSuppliers);

export default router;
