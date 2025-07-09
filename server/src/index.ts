import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

import carRoutes from './routes/carRoutes';

app.use('/api/auth', authRoutes);
import dealerRoutes from './routes/dealerRoutes';

app.use('/api/cars', carRoutes);
import reviewRoutes from './routes/reviewRoutes';

app.use('/api/dealers', dealerRoutes);
import cartRoutes from './routes/cartRoutes';

app.use('/api/reviews', reviewRoutes);
import orderRoutes from './routes/orderRoutes';

app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});