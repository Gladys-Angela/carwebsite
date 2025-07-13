import Order from '../models/order.model';
import Cart from '../models/cart.model';

export const createOrder = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.carId');

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const totalPrice = cart.items.reduce((acc: number, item: any) => {
    const price = item.type === 'Sale' ? item.carId.price : item.carId.hireRate;
    return acc + price * item.quantity;
  }, 0);

  const order = new Order({
    user: userId,
    cars: cart.items.map((item: any) => item.carId._id),
    totalPrice,
  });
  await order.save();

  await Cart.findOneAndUpdate({ user: userId }, { items: [] });

  return order;
};

export const getAllOrders = async () => {
  return await Order.find().populate('user').populate('cars');
};
export const getOrderById = async (id: string) => {
  return await Order.findById(id).populate('cars');
};

export const createTestOrder = async () => {
  // Find a test user and some cars to create a sample order
  const User = require('../models/user.model').default;
  const Car = require('../models/car.model').default;
  
  const testUser = await User.findOne({ email: 'test@example.com' });
  if (!testUser) {
    throw new Error('Test user not found. Please ensure the database is seeded.');
  }
  
  const cars = await Car.find().limit(2);
  if (cars.length === 0) {
    throw new Error('No cars found. Please ensure the database is seeded.');
  }
  
  const totalPrice = cars.reduce((acc: number, car: any) => {
    const price = car.type === 'Sale' ? car.price : car.hireRate;
    return acc + price;
  }, 0);
  
  const order = new Order({
    user: testUser._id,
    cars: cars.map((car: any) => car._id),
    totalPrice,
    status: 'Pending',
  });
  
  await order.save();
  return await Order.findById(order._id).populate('user').populate('cars');
};
