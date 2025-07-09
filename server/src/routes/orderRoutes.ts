import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.route('/')
  .post(orderController.createOrder);

router.get('/:id', orderController.getOrderById);

export default router;