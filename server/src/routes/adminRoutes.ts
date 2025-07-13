import { Router } from 'express';
import { protect, authorize } from '../middleware/authMiddleware';
import { getAllCars, createCar, updateCar, deleteCar } from '../controllers/carController';
import { getAllOrders, getOrderById, createTestOrder } from '../controllers/orderController';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

// Car routes
router.route('/cars').get(protect, authorize('admin'), getAllCars).post(protect, authorize('admin'), createCar);
router.route('/cars/:id').put(protect, authorize('admin'), updateCar).delete(protect, authorize('admin'), deleteCar);

// Order routes
router.route('/orders').get(protect, authorize('admin'), getAllOrders);
router.route('/orders/test').post(protect, authorize('admin'), createTestOrder);
router.route('/orders/:id').get(protect, authorize('admin'), getOrderById);

// User routes
router.route('/users').get(protect, authorize('admin'), getAllUsers);
router.route('/users/:id').get(protect, authorize('admin'), getUserById).put(protect, authorize('admin'), updateUser).delete(protect, authorize('admin'), deleteUser);

export default router;
