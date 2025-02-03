import express from "express";
import { Router } from "express";
import { verifyUser } from "../middlewares/jwtverify";
import { confirmOrder } from "../controllers/order.controller";

const router = Router();

router.post("/confirm-order", verifyUser, confirmOrder);

export default router;
