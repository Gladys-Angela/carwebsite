import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    await authService.register(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    await authService.createAdmin();
    res.status(201).json({ message: "Admin user created successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    await authService.deleteAdmin();
    res.status(200).json({ message: "Admin user deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
