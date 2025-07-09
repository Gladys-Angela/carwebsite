import { Response } from 'express';
import * as cartService from '../services/cartService';
import { AuthRequest } from '../middleware/authMiddleware';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await cartService.getCart(req.user!.id);
    res.status(200).json(cart);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { carId, type, quantity } = req.body;
    const cartItem = await cartService.addToCart(req.user!.id, carId, type, quantity);
    res.status(201).json(cartItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    await cartService.removeFromCart(parseInt(req.params.itemId));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { quantity } = req.body;
    const cartItem = await cartService.updateCartItem(parseInt(req.params.itemId), quantity);
    res.status(200).json(cartItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};