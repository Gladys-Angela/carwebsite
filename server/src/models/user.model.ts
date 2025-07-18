import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  role: 'user' | 'admin';
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export default mongoose.model<IUser>('User', UserSchema);