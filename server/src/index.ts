import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import carRoutes from './routes/carRoutes';
import dealerRoutes from './routes/dealerRoutes';
import reviewRoutes from './routes/reviewRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import adminRoutes from './routes/adminRoutes';

import Order from './models/order.model';
import Car from './models/car.model';
dotenv.config(); // Load .env variables

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8080", "https://carwebsite-git-main-gladysangelas-projects.vercel.app"],
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: ["http://localhost:8080", "https://carwebsite-git-main-gladysangelas-projects.vercel.app"],  // Your frontend URLs
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running... Updated for Vercel CORS');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Emit stats every 5 seconds
  const interval = setInterval(async () => {
    const sales = await Order.countDocuments({ status: 'Completed' });
    const inventory = await Car.countDocuments();
    socket.emit('stats', { sales, inventory });
  }, 5000);

  socket.on('disconnect', () => {
    console.log('user disconnected');
    clearInterval(interval);
  });
});

server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
