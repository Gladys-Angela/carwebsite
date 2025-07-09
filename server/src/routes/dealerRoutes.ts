import { Router } from 'express';
import * as dealerController from '../controllers/dealerController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.route('/')
  .get(dealerController.getAllDealers)
  .post(protect, authorize('admin'), dealerController.createDealer);

router.get('/:id', dealerController.getDealerById);

export default router;