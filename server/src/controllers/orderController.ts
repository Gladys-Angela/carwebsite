import { Response } from 'express';
import * as orderService from '../services/orderService';
import { AuthRequest } from '../middleware/authMiddleware';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await orderService.createOrder(req.user!.id);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const createTestOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await orderService.createTestOrder();
    res.status(201).json({ message: 'Test order created successfully', order });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
