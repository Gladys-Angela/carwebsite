import { Request, Response } from 'express';
import * as dealerService from '../services/dealerService';

export const getAllDealers = async (req: Request, res: Response) => {
  try {
    const dealers = await dealerService.getAllDealers();
    res.status(200).json(dealers);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getDealerById = async (req: Request, res: Response) => {
  try {
    const dealer = await dealerService.getDealerById(parseInt(req.params.id));
    if (!dealer) {
      return res.status(404).json({ message: 'Dealer not found' });
    }
    res.status(200).json(dealer);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const createDealer = async (req: Request, res: Response) => {
  try {
    const dealer = await dealerService.createDealer(req.body);
    res.status(201).json(dealer);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};