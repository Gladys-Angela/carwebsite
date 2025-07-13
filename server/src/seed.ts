import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// MongoDB Connection
mongoose.connect("mongodb+srv://gladys:%40MongoDB789@cluster0.vskwg6l.mongodb.net/your_db?retryWrites=true&w=majority");

// Define Schemas
const DealerSchema = new mongoose.Schema({
    name: String,
    location: String,
    phone: String,
    email: String,
});

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password_hash: String, // Will be hashed
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

const CarSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    price: Number,
    hireRate: Number,
    type: String, // 'Sale' or 'Hire'
    image: String,
    mileage: Number,
    location: String,
    condition: String,
    transmission: String,
    fuelType: String,
    features: String,
    dealer: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

const Dealer = mongoose.model("Dealer", DealerSchema);
const User = mongoose.model("User", UserSchema);
const Car = mongoose.model("Car", CarSchema);
const Order = mongoose.model("Order", OrderSchema);

async function seedDatabase() {
    try {
    // Clear existing data
    await mongoose.connection.dropDatabase();
    console.log("Database cleared!");

    // Create Dealers
    const dealer1 = await Dealer.create({
        name: "Prestige Motors",
        location: "Nairobi, Kenya",
        phone: "555-111-2222",
        email: "contact@prestigemotors.com",
    });

    const dealer2 = await Dealer.create({
        name: "Sunset Auto",
        location: "Mombasa, Kenya",
        phone: "555-333-4444",
        email: "contact@sunsetauto.com",
    });

    // Create User (with hashed password)
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user1 = await User.create({
        username: "testuser",
        email: "test@example.com",
        password_hash: hashedPassword,
        role: "user",
    });

    const adminUser = await User.create({
        username: "admin",
        email: "admin@example.com",
        password_hash: hashedPassword,
        role: "admin",
    });

    // Create Cars
    const cars = [
    {
        make: "Toyota",
        model: "Camry",
        year: 2023,
        price: 28500,
        hireRate: 75,
        type: "Sale",
        image: "/car-images/featured1.png",
        mileage: 15000,
        location: "Nairobi, Kenya",
        condition: "Used",
        transmission: "Automatic",
        fuelType: "Gasoline",
        features: "Backup Camera, Bluetooth, Cruise Control",
        dealer: dealer1._id,
        createdBy: user1._id,
    },
    {
        make: 'BMW',
        model: 'X5',
        year: 2022,
        price: 65000,
        hireRate: 150,
        type: 'Sale',
        image: '/car-images/featured2.png',
        mileage: 8500,
        location: 'Mombasa, Kenya',
        condition: 'Certified Pre-Owned',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        features: 'Leather Seats, Navigation, Sunroof',
        dealer: dealer2._id,
        createdBy: user1._id,
    },
    {
        make: 'Tesla',
        model: 'Model 3',
        year: 2023,
        price: 42000,
        hireRate: 120,
        type: 'Hire',
        image: '/car-images/featured3.png',
        mileage: 5000,
        location: 'Nairobi, Kenya',
        condition: 'Used',
        transmission: 'Automatic',
        fuelType: 'Electric',
        features: 'Autopilot, Supercharging, Premium Audio',
        dealer: dealer1._id,
        createdBy: user1._id,
    },
    {
        make: 'Honda',
        model: 'Accord',
        year: 2023,
        price: 26500,
        hireRate: 70,
        type: 'Hire',
        image: '/car-images/featured4.png',
        mileage: 12000,
        location: 'Mombasa, Kenya',
        condition: 'Used',
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        features: 'Honda Sensing, Apple CarPlay, LED Headlights',
        dealer: dealer2._id,
        createdBy: user1._id,
    },
    {
        make: 'Ford',
        model: 'Mustang',
        year: 2023,
        price: 45000,
        hireRate: 130,
        type: 'Sale',
        image: '/car-images/featured5.png',
        mileage: 2000,
        location: 'Nairobi, Kenya',
        condition: 'New',
        transmission: 'Manual',
        fuelType: 'Gasoline',
        features: 'Performance Package, Brembo Brakes, MagneRide Damping',
        dealer: dealer1._id,
        createdBy: user1._id,
    },
    {
        make: 'Audi',
        model: 'Q5',
        year: 2023,
        price: 55000,
        hireRate: 140,
        type: 'Hire',
        image: '/car-images/popular1.png',
        mileage: 5000,
        location: 'Mombasa, Kenya',
        condition: 'Used',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        features: 'Virtual Cockpit, Bang & Olufsen Sound System, Panoramic Sunroof',
        dealer: dealer2._id,
        createdBy: user1._id,
    },
    ];

    const createdCars = await Car.insertMany(cars);
    console.log("Cars created!");

    // Create some sample orders
    const sampleOrders = [
        {
            user: user1._id,
            cars: [createdCars[0]._id, createdCars[1]._id], // Toyota Camry and BMW X5
            totalPrice: 93500, // 28500 + 65000
            status: 'Completed',
            createdAt: new Date('2024-01-15'),
        },
        {
            user: user1._id,
            cars: [createdCars[2]._id], // Tesla Model 3
            totalPrice: 42000,
            status: 'Pending',
            createdAt: new Date('2024-01-20'),
        },
        {
            user: user1._id,
            cars: [createdCars[4]._id], // Ford Mustang
            totalPrice: 45000,
            status: 'Completed',
            createdAt: new Date('2024-01-25'),
        }
    ];

    await Order.insertMany(sampleOrders);
    console.log("Sample orders created!");
    console.log("Database seeded successfully!");
} catch (error) {
    console.error("Seeding error:", error);
} finally {
    mongoose.disconnect();
}
}

seedDatabase();
