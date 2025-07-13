import Order from '../models/order.model';
import Cart from '../models/cart.model';

export const createOrder = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.car');

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const totalPrice = cart.items.reduce((acc: number, item: any) => {
    const price = item.car.type === 'Sale' ? item.car.price : item.car.hireRate;
    return acc + price * item.quantity;
  }, 0);

  const order = new Order({
    user: userId,
    cars: cart.items.map((item: any) => item.car._id),
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