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
    password: String, // Will be hashed
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

const Dealer = mongoose.model("Dealer", DealerSchema);
const User = mongoose.model("User", UserSchema);
const Car = mongoose.model("Car", CarSchema);

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
        password: hashedPassword,
    });

    const adminUser = await User.create({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
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

    await Car.insertMany(cars);
    console.log("Database seeded successfully!");
} catch (error) {
    console.error("Seeding error:", error);
} finally {
    mongoose.disconnect();
}
}

seedDatabase();