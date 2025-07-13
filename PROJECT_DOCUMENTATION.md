# Car Website E-commerce Platform Documentation

## Project Overview

A full-stack e-commerce platform for buying and hiring cars, built with React (TypeScript) frontend and Node.js/Express backend with MongoDB database.

## 🚀 Features

### Customer Features
- **Car Browsing**: View available cars for sale or hire
- **Search & Filters**: Filter cars by make, model, price, type, etc.
- **User Authentication**: Register and login system
- **Shopping Cart**: Add cars to cart, manage quantities
- **Checkout Process**: Complete purchase with shipping information
- **Order Management**: View order history and status

### Admin Features
- **Admin Dashboard**: Comprehensive admin panel
- **Car Management**: Add, edit, delete car listings
- **User Management**: View and manage user accounts
- **Order Management**: View all customer orders, create test orders
- **Role-based Access**: Secure admin-only sections

### Technical Features
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live cart and order updates
- **Secure Authentication**: JWT-based authentication
- **Data Validation**: Input validation on frontend and backend
- **Error Handling**: Comprehensive error handling throughout

## 🏗️ Architecture

### Frontend (React + TypeScript)
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Navigation.tsx  # Main navigation
│   ├── HeroSection.tsx # Homepage hero
│   └── ...
├── pages/              # Page components
│   ├── admin/          # Admin-only pages
│   ├── LoginPage.tsx   # Authentication pages
│   ├── BuyCarsPage.tsx # Car browsing
│   ├── CartPage.tsx    # Shopping cart
│   └── ...
├── services/           # API service functions
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

### Backend (Node.js + Express + TypeScript)
```
server/src/
├── controllers/        # Request handlers
├── services/          # Business logic
├── models/            # MongoDB schemas
├── routes/            # API route definitions
├── middleware/        # Authentication, validation
├── config/            # Database configuration
└── index.ts           # Server entry point
```

## 📊 Database Schema

### User Model
```typescript
{
  username: string
  email: string (unique)
  password_hash: string
  role: 'user' | 'admin'
}
```

### Car Model
```typescript
{
  make: string
  model: string
  year: number
  price: number
  hireRate: number
  type: 'Sale' | 'Hire'
  image: string
  mileage: number
  location: string
  condition: string
  transmission: string
  fuelType: string
  features: string
  dealer: ObjectId (ref: Dealer)
  createdBy: ObjectId (ref: User)
}
```

### Order Model
```typescript
{
  user: ObjectId (ref: User)
  cars: [ObjectId] (ref: Car)
  totalPrice: number
  status: 'Pending' | 'Completed' | 'Cancelled'
  createdAt: Date
}
```

### Cart Model
```typescript
{
  user: ObjectId (ref: User)
  items: [{
    carId: ObjectId (ref: Car)
    quantity: number
    type: 'Sale' | 'Hire'
  }]
}
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/Gladys-Angela/carwebsite.git
cd carwebsite
```

2. **Install Frontend Dependencies**
```bash
npm install
```

3. **Install Backend Dependencies**
```bash
cd server
npm install
cd ..
```

4. **Environment Configuration**
Create `.env` file in the server directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carwebsite
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

5. **Seed the Database**
```bash
cd server
npm run seed
cd ..
```

6. **Start Development Servers**

Backend (Terminal 1):
```bash
cd server
npm run dev
```

Frontend (Terminal 2):
```bash
npm run dev
```

## 🌐 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/create-admin` - Create admin user
- `DELETE /api/auth/delete-admin` - Delete admin user

### Car Routes
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `POST /api/admin/cars` - Create car (admin only)
- `PUT /api/admin/cars/:id` - Update car (admin only)
- `DELETE /api/admin/cars/:id` - Delete car (admin only)

### Cart Routes
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item

### Order Routes
- `POST /api/orders` - Create order from cart
- `GET /api/orders/:id` - Get order by ID
- `GET /api/admin/orders` - Get all orders (admin only)
- `POST /api/admin/orders/test` - Create test order (admin only)

### User Management Routes
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/users/:id` - Get user by ID (admin only)
- `PUT /api/admin/users/:id` - Update user (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)

## 🔐 Authentication & Authorization

### JWT Authentication
- Users receive JWT token upon login
- Token stored in localStorage
- Token included in Authorization header for protected routes
- Token expires in 1 hour

### Role-based Access Control
- **User Role**: Can browse cars, manage cart, place orders
- **Admin Role**: Full access to admin panel, user management, car management

### Protected Routes
- All cart operations require authentication
- Order creation requires authentication
- Admin routes require admin role
- Middleware validates JWT and user roles

## 🎨 UI/UX Features

### Design System
- **Shadcn/ui Components**: Consistent, accessible UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Toast Notifications**: Success/error notifications

### User Experience
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time input validation
- **Intuitive Navigation**: Clear navigation structure

## 🧪 Testing

### Manual Testing Checklist

#### User Registration & Login
- [ ] Register new user account
- [ ] Login with valid credentials
- [ ] Handle invalid login attempts
- [ ] Role-based redirection (user vs admin)

#### Car Browsing & Cart
- [ ] Browse available cars
- [ ] Add cars to cart
- [ ] Update cart quantities
- [ ] Remove items from cart
- [ ] Cart persistence across sessions

#### Checkout Process
- [ ] Proceed to checkout with items in cart
- [ ] Fill out shipping information
- [ ] Complete order placement
- [ ] Verify order creation in database
- [ ] Cart cleared after successful order

#### Admin Functions
- [ ] Access admin dashboard
- [ ] View all users
- [ ] View all orders (including customer orders)
- [ ] Create/edit/delete cars
- [ ] Create test orders

## 🚀 Deployment 

### 🌟 Deployment Platforms

#### 1. **Vercel (Frontend) + Railway (Backend)**
