import { Router } from "express";
import multer from "multer";
import { createProductController, getProducts } from "../controllers/product.controller.js";

const upload = multer({ dest: 'temp-uploads/'});
const router = Router();

router.post('/create-product', upload.array('files', 5) , createProductController);
router.get('/get-products', getProducts);
// router.delete('/:id', deleteProduct);

export default router;