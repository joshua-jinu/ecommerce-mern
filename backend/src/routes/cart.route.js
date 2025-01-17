import {Router} from 'express';
import { verifyUser } from '../middlewares/jwtverify';
import { AddToCartController, getCartProducts } from '../controllers/cart.controller';

const router = Router();

router.post('/add-to-cart', verifyUser, AddToCartController);
router.post('/get-user-cart-data', verifyUser, getCartProducts);


export default router;