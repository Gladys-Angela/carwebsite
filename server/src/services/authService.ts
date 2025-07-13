import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (data: any): Promise<IUser> => {
  const { username, email, password, role } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password_hash: hashedPassword,
    role,
  });
  await user.save();
  return user;
};

export const login = async (data: any): Promise<{ user: { _id: any; username: string; email: string; role: "user" | "admin"; }; token: string }> => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Create a plain user object for the token, excluding the password
  const userPayload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign({ user: userPayload }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { user: userPayload, token };
};