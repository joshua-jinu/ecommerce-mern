import { Router } from "express";
import { createUser, login, signup, verifyUserController } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/create-user", upload.single("file"), createUser);
router.get("/authentication/:token", verifyUserController); //url to verify users

router.post('/signup', signup);
router.post('/login', login);

export default router;