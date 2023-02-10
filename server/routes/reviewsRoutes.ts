import express from "express";
import Validator from "../middlewares/Validator";
import { Authentication } from "../middlewares/authentication";
import {
  createReview,
  getReviewSummary,
  deleteReview,
  getReviews,
} from "../controllers/reviews";
import { Authorization } from "../middlewares/authorization";
const router: any = express.Router({ mergeParams: true });

router.post("/", Validator("review"), Authentication, createReview);
router.get("/", getReviews);
router.get("/summary", getReviewSummary);
router.delete("/:id", Authentication, Authorization(["admin"]), deleteReview);

export default router;
