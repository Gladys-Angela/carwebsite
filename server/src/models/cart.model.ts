import mongoose, { Document, Schema } from 'mongoose';
import { ICar } from './car.model';

export interface ICartItem extends Document {
  carId: mongoose.Types.ObjectId | ICar;
  quantity: number;
  type: 'Sale' | 'Hire';
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
}

const CartItemSchema: Schema = new Schema({
  carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  quantity: { type: Number, required: true, min: 1 },
  type: { type: String, enum: ['Sale', 'Hire'], required: true },
});

const CartSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [CartItemSchema],
});

export default mongoose.model<ICart>('Cart', CartSchema);