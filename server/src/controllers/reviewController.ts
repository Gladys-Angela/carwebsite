import { Response } from 'express';
import * as reviewService from '../services/reviewService';
import { AuthRequest } from '../middleware/authMiddleware';

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const review = await reviewService.createReview(parseInt(req.params.carId), req.user!.id, req.body);
    res.status(201).json(review);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getReviewsByCar = async (req: AuthRequest, res: Response) => {
  try {
    const reviews = await reviewService.getReviewsByCar(parseInt(req.params.carId));
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReview = async (req: AuthRequest, res: Response) => {
  try {
    const review = await reviewService.updateReview(parseInt(req.params.id), req.body);
    res.status(200).json(review);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    await reviewService.deleteReview(parseInt(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};