import { Router } from 'express';
import * as reviewController from '../controllers/reviewController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router({ mergeParams: true });

router.route('/')
  .get(reviewController.getReviewsByCar)
  .post(protect, reviewController.createReview);

router.route('/:id')
  .put(protect, reviewController.updateReview)
  .delete(protect, reviewController.deleteReview);

export default router;