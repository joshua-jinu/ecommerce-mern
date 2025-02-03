import express from "express";
import { Router } from "express";
import { verifyUser } from "../middlewares/jwtverify.js";
import { confirmOrder, getOrders } from "../controllers/order.controller.js";

const router = Router();

router.post("/confirm-order", verifyUser, confirmOrder);
router.get("/user-orders-data", verifyUser, getOrders);

export default router;
