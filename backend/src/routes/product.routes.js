import { Router } from "express";
import multer from "multer";
const upload = multer({ dest: 'temp-uploads/'});

const router = Router();
import { createProductController } from "../controllers/product.controller.js";

router.post('/create-product', upload.array('files', 5),createProductController);

model.exports = router;