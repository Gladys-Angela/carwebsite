import mongoose, { Document, Schema } from 'mongoose';

export interface IDealer extends Document {
  name: string;
  location: string;
  phone: string;
  email: string;
}

const DealerSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<IDealer>('Dealer', DealerSchema);