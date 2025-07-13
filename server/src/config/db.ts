import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.DATABASE_URL || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MongoDB connection string is not defined. Please set DATABASE_URL or MONGODB_URI environment variable.');
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
