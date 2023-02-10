import express from "express";
import {
  getBanners,
  createBanner,
  getBanner,
  updateBanner,
  getAllBanners,
  deleteBanner,
} from "../controllers/banners";
import { Authentication } from "../middlewares/authentication";
import { Authorization } from "../middlewares/authorization";
import Validator from "../middlewares/Validator";
const router: any = express.Router();

router.get("/", getBanners);
router.post(
  "/",
  Authentication,
  Authorization(["admin"]),
  Validator("banner"),
  createBanner
);
router.get("/all", getAllBanners);
router.get("/:id", Authentication, Authorization(["admin"]), getBanner);
router.patch(
  "/:id",
  Authentication,
  Authorization(["admin"]),
  Validator("banner"),
  updateBanner
);
router.delete("/:id", Authentication, Authorization(["admin"]), deleteBanner);

export default router;
