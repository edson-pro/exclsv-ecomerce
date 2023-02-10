import express from "express";
import {
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  getBrands,
  getBrandProducts,
} from "../controllers/brands";
import { Authentication } from "../middlewares/authentication";
import { Authorization } from "../middlewares/authorization";
import Validator from "../middlewares/Validator";
const router: any = express.Router();
router.get("/all", getAllBrands);
router.get("/:id", getBrand);
router.post(
  "/",
  Authentication,
  Validator("brand"),
  Authorization(["admin"]),
  createBrand
);
router.patch(
  "/:id",
  Validator("brand"),
  Authentication,
  Authorization(["admin"]),
  updateBrand
);
router.delete("/:id", Authentication, Authorization(["admin"]), deleteBrand);

router.get("/:id/products", getBrandProducts);
router.get("/", getBrands);

export default router;
