import { Router } from 'express';
import * as cartController from '../controllers/cartController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.route('/')
  .get(cartController.getCart)
  .post(cartController.addToCart);

router.route('/items/:itemId')
  .put(cartController.updateCartItem)
  .delete(cartController.removeFromCart);

export default router;