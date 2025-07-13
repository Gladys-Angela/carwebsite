import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  cars: mongoose.Types.ObjectId[];
  totalPrice: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cars: [{ type: Schema.Types.ObjectId, ref: 'Car', required: true }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);