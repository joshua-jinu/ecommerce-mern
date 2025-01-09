import { Router } from "express";
import multer from "multer";
import { createProductController, deleteProduct, getProducts, getSingleProduct, updateProduct } from "../controllers/product.controller.js";

const upload = multer({ dest: 'temp-uploads/'});
const router = Router();

router.post('/create-product', upload.array('files', 5) , createProductController);
router.get('/get-product/:id', getSingleProduct);
router.get('/get-products', getProducts);
router.put('/update-products', upload.array('files', 5), updateProduct);
router.delete('/:id', deleteProduct);

export default router;