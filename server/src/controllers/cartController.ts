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
    console.log("➡️ Incoming body:", req.body);
    console.log("➡️ Authenticated user:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { carId, type, quantity } = req.body;
    
    if (!carId || !type || !quantity) {
      return res.status(400).json({ message: 'Missing required fields: carId, type, and quantity are required' });
    }

    const cartItem = await cartService.addToCart(req.user.id, carId, type, quantity);
    res.status(201).json(cartItem);
  } catch (error: any) {
    console.error("❌ Add to cart error:", error);
    res.status(400).json({ message: error.message });
  }
};


export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    await cartService.removeFromCart(req.user!.id, req.params.itemId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { quantity } = req.body;
    const cartItem = await cartService.updateCartItem(req.user!.id, req.params.itemId, quantity);
    res.status(200).json(cartItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
