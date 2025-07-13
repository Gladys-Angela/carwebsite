import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICar {
    make: string;
    carModel: string;
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
    dealer: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    averageRating?: number;
  }

// Properly extend Document
interface ICarDocument extends ICar, Document {}

// Add static methods if needed
interface ICarModel extends Model<ICarDocument> {}

const CarSchema = new Schema<ICarDocument, ICarModel>({
    make: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    hireRate: { type: Number, required: true },
    type: { type: String, enum: ['Sale', 'Hire'], required: true },
    image: { type: String, required: true },
    mileage: { type: Number, required: true },
    location: { type: String, required: true },
    condition: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    features: { type: String, required: true },
    dealer: { type: Schema.Types.ObjectId, ref: 'Dealer', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });  // Added timestamps for created/updated fields

// Correct model declaration - use ICarDocument not ICar
const Car = mongoose.model<ICarDocument, ICarModel>('Car', CarSchema);

export default Car;