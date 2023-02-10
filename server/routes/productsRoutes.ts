import express from "express";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  createVariant,
  deleteVariant,
  updateVariant,
  getVariant,
  getVariants,
  getProductDiscount,
  updateProductDiscount,
  createProductDiscount,
  deleteProductDiscount,
  getBestDeals,
  deleteBestDeal,
  getBestDeal,
  createBestDeal,
  updateDeal,
} from "../controllers/products";
import reviewsRoutes from "./reviewsRoutes";
import { Authentication } from "../middlewares/authentication";
import { Authorization } from "../middlewares/authorization";
import Validator from "../middlewares/Validator";
const router: any = express.Router({ mergeParams: true });

router.get("/all", getAllProducts);
router.get("/deals", getBestDeals);
router.get("/deals/:id", getBestDeal);
router.patch(
  "/deals/:id",
  Authorization(["admin"]),
  Authentication,
  updateDeal
);
router.post("/deals", Authorization(["admin"]), createBestDeal);
router.delete(
  "/deals/:id",
  Authentication,
  Authorization(["admin"]),
  deleteBestDeal
);
router.get("/:id", getProduct);
router.post(
  "/",
  Validator("product"),
  Authentication,
  Authorization(["admin"]),
  createProduct
);
router.patch(
  "/:id",
  Validator("product"),
  Authentication,
  Authorization(["admin"]),
  updateProduct
);

router.delete("/:id", Authentication, Authorization(["admin"]), deleteProduct);

router.get("/", Authentication, getProducts);

router.get("/:productId/variants/:id", Authentication, getVariant);
router.post(
  "/:productId/variants",
  Authentication,
  Authorization(["admin"]),
  createVariant
);
router.get("/:productId/variants", Authentication, getVariants);
router.patch(
  "/:productId/variants/:id",
  Authentication,
  Authorization(["admin"]),
  updateVariant
);
router.delete(
  "/:productId/variants/:id",
  Authentication,
  Authorization(["admin"]),
  deleteVariant
);

router.get("/:productId/discount", getProductDiscount);
router.post(
  "/:productId/discount",
  Validator("productDiscount"),
  Authentication,
  Authorization(["admin"]),
  createProductDiscount
);
router.patch(
  "/:productId/discount",
  Validator("productDiscount"),
  Authentication,
  Authorization(["admin"]),
  updateProductDiscount
);
router.delete(
  "/:productId/discount",
  Authentication,
  Authorization(["admin"]),
  deleteProductDiscount
);

router.use("/:productId/reviews", reviewsRoutes);

export default router;
