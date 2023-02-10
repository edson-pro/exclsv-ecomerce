import express from "express";
import { getAddress } from "../controllers/addresses";
import { getMyAddresses, getMyOrders, getMyPayments } from "../controllers/me";
import cartRoutes from "./cartRoutes";
const router: any = express.Router({ mergeParams: true });

router.get("/orders", getMyOrders);
router.get("/payments", getMyPayments);
router.use("/addresses", getMyAddresses);
router.use("/cart", cartRoutes);

export default router;
