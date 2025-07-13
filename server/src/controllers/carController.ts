import { Response } from 'express';
import * as carService from '../services/carService';
import { AuthRequest } from '../middleware/authMiddleware';

export const getAllCars = async (req: AuthRequest, res: Response) => {
  try {
    const result = await carService.getAllCars(req.query);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getFeaturedCars = async (req: AuthRequest, res: Response) => {
  try {
    const cars = await carService.getFeaturedCars();
    res.status(200).json(cars);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCarById = async (req: AuthRequest, res: Response) => {
  try {
    const car = await carService.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const createCar = async (req: AuthRequest, res: Response) => {
  try {
    const car = await carService.createCar(req.body, req.user!.id);
    res.status(201).json(car);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMakes = async (req: AuthRequest, res: Response) => {
  try {
    const makes = await carService.getMakes();
    res.status(200).json(makes);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getModels = async (req: AuthRequest, res: Response) => {
  try {
    const models = await carService.getModels();
    res.status(200).json(models);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCar = async (req: AuthRequest, res: Response) => {
  try {
    const car = await carService.updateCar(req.params.id, req.body);
    res.status(200).json(car);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCar = async (req: AuthRequest, res: Response) => {
  try {
    await carService.deleteCar(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};