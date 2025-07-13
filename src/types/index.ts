export interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  hireRate: number;
  type: 'Sale' | 'Hire';
  image: string;
  mileage: number;
  location: string;
  condition: string;
  transmission: string;
  fuelType: string;
  features: string;
  dealer: any;
  createdBy: any;
  averageRating?: number;
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Order {
  _id: string;
  user: User;
  cars: Car[];
  totalPrice: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  createdAt: Date;
}