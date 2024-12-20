import { Router } from "express";
import multer from "multer";
const upload = multer({ dest: 'temp-uploads/'});
import { createProductController } from "../controllers/product.controller.js";

const router = Router();

router.post('/create-product', upload.array('files', 5),createProductController);

export default router;