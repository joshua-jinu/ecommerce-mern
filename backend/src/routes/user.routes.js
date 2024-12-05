import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.get("/create-user", upload.single("file"), createUser);

export default router;