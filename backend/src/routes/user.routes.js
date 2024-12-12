import { Router } from "express";
import { createUser, verifyUserController } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/create-user", upload.single("file"), createUser);
router.get("/authentication/:token", verifyUserController); //url to verify users


export default router;