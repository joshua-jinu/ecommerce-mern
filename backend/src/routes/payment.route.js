import express from "express";
import {
  createOrder,
  PayOrders,
  getKeys,
} from "../controllers/payment.controller.js";
import { verifyUser } from "../middlewares/jwtverify.js";

const router = express.Router();

router.post("/create-order", createOrder);

router.post("/pay-order", verifyUser, PayOrders);

router.get("/get-razorpay-key", getKeys);

export default router;
