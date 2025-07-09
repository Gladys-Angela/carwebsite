import { Router } from 'express';
import * as carController from '../controllers/carController';
import { protect, authorize } from '../middleware/authMiddleware';
import reviewRouter from './reviewRoutes';

const router = Router();

router.use('/:carId/reviews', reviewRouter);

router.route('/')
  .get(carController.getAllCars)
  .post(protect, authorize('dealer', 'admin'), carController.createCar);

router.get('/featured', carController.getFeaturedCars);

router.get('/makes', carController.getMakes);
router.get('/models', carController.getModels);

router.route('/:id')
  .get(carController.getCarById)
  .put(protect, authorize('dealer', 'admin'), carController.updateCar)
  .delete(protect, authorize('dealer', 'admin'), carController.deleteCar);

export default router;