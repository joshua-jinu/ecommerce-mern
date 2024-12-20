import { Router } from "express";
import multer from "multer";
import { createProductController } from "../controllers/product.controller.js";

const upload = multer({ dest: 'temp-uploads/'});
const router = Router();

router.post('/create-product', upload.array('files', 5) , createProductController);

export default router;