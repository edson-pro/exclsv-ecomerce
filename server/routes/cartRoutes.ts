import express from "express";
import {
  getCart,
  clearCart,
  addItemToCart,
  removeItemToCart,
  updateCartItem,
  getCartItems,
  getCartItem,
} from "../controllers/cart";
import { Authentication } from "../middlewares/authentication";
import Validator from "../middlewares/Validator";
const router: any = express.Router({ mergeParams: true });

router.get("/", Authentication, getCart);
router.get("/items/:itemId", Authentication, getCartItem);
router.get("/items", Authentication, getCartItems);
router.delete("/", Authentication, clearCart);
router.post("/items", Validator("cart"), Authentication, addItemToCart);
router.delete("/items/:itemId", Authentication, removeItemToCart);
router.patch(
  "/items/:itemId",
  Validator("cart"),
  Authentication,
  updateCartItem
);

export default router;
