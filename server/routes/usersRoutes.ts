import express from "express";
import {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  googleSignin,
  appleSignin,
  refreshToken,
  update,
  deleteUser,
  getCurrentUser,
  changePassword,
  sendEmailVerification,
  verifyEmailCode,
  getUserProfile,
  getUsers,
  makeAdmin,
  deleteUserById,
} from "../controllers/users";
import { Authentication } from "../middlewares/authentication";
import { Authorization } from "../middlewares/authorization";
import Validator from "../middlewares/Validator";
import addressesRoutes from "../routes/addressesRoutes";
const router: any = express.Router({ mergeParams: true });

router.get("/:id", Authentication, getUserProfile);
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);
router.post("/current-user", Authentication, getCurrentUser);
router.post("/change-password", Authentication, changePassword);
router.post("/verify-email", Authentication, verifyEmailCode);
router.post("/send-verification-email", Authentication, sendEmailVerification);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);
router.post("/google", googleSignin);
router.post("/apple", appleSignin);
router.post("/update", Validator("profile"), Authentication, update);
router.delete("/delete", Authentication, deleteUser);
router.delete("/:id", Authentication, deleteUserById);
router.get("/", Authentication, Authorization(["admin"]), getUsers);
router.post("/make-admin", Authentication, Authorization(["admin"]), makeAdmin);

router.use("/:userId/addresses", addressesRoutes);

export default router;
