import express from "express";
import dotenv from "dotenv";
import userHandler from "./routes/user.routes.js";
import productHandler from "./routes/product.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import cartHandler from "./routes/cart.route.js";
import orderHandler from "./routes/order.routes.js";

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "./src/config/.env",
  });
}

export const app = express();
app.use(express.json());
// Enable CORS for frontend requests
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend URL
  })
);

app.get("/", (req, res) => {
  return res.send("Welcome to backend");
});

app.use("/user", userHandler);
app.use("/product", productHandler);
app.use("/cart", cartHandler);
app.use("/order", orderHandler);
app.use(cookieParser());
