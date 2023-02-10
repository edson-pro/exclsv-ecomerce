import express from "express";
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategories,
  getCategoryProducts,
  getCategoryBrands,
  getCategoriesProducts,
} from "../controllers/categories";
import { Authentication } from "../middlewares/authentication";
import { Authorization } from "../middlewares/authorization";
import Validator from "../middlewares/Validator";
const router: any = express.Router();

router.get("/products", getCategoriesProducts);
router.get("/all", getAllCategories);
router.get("/:id", getCategory);
router.post(
  "/",
  Authentication,
  Validator("category"),
  Authorization(["admin"]),
  createCategory
);
router.patch(
  "/:id",
  Validator("category"),
  Authentication,
  Authorization(["admin"]),
  updateCategory
);
router.delete("/:id", Authentication, Authorization(["admin"]), deleteCategory);

router.get("/:id/products", getCategoryProducts);
router.get("/:id/brands", getCategoryBrands);
router.get("/", Authentication, Authorization(["admin"]), getCategories);

export default router;
