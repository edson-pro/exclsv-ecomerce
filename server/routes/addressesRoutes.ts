import express from "express";
import {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  getUserAddresses,
} from "../controllers/addresses";
import { Authentication } from "../middlewares/authentication";
import Validator from "../middlewares/Validator";
const router: any = express.Router({ mergeParams: true });

router.get("/:id", Authentication, getAddress);
router.post("/", Validator("address"), Authentication, createAddress);
router.patch("/:id", Validator("address"), Authentication, updateAddress);
router.delete("/:id", Authentication, deleteAddress);
router.get("/", Authentication, getUserAddresses);

export default router;
