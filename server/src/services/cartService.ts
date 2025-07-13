import mongoose from 'mongoose';
import Cart from '../models/cart.model';

export const getCart = async (userId: string) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.carId');

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
    await cart.save();
  }

  return cart;
};

export const addToCart = async (userId: string, carId: string, type: 'Sale' | 'Hire', quantity: number) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const carObjectId = new mongoose.Types.ObjectId(carId);
  const existingItem = cart.items.find(item => {
    const itemCarIdString = item.carId.toString();
    return itemCarIdString === carObjectId.toString() && item.type === type;
  });

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ carId: carObjectId, quantity, type } as any);
  }

  await cart.save();
  return cart.populate('items.carId');
};

export const removeFromCart = async (userId: string, itemId: string) => {
  const cart = await getCart(userId);
  // Ensure we are comparing strings to strings
  cart.items = cart.items.filter(item => (item as any)._id.toString() !== itemId);
  await cart.save();
  return cart;
};

export const updateCartItem = async (userId: string, itemId: string, quantity: number) => {
  const cart = await getCart(userId);
  const item = cart.items.find(item => (item as any)._id.toString() === itemId);

  if (item) {
    item.quantity = quantity;
    await cart.save();
  }

  return cart;
};
