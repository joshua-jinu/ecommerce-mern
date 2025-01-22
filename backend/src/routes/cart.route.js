import {Router} from 'express';
import { verifyUser } from '../middlewares/jwtverify.js';
import { AddToCartController, getCartProducts } from '../controllers/cart.controller.js';

const router = Router();

router.post('/add-to-cart', verifyUser, AddToCartController);
router.get('/get-user-cart-data', verifyUser, getCartProducts);


export default router;