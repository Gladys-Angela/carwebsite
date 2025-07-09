import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await prisma.cartItem.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.car.deleteMany({});
  await prisma.dealer.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Dealers
  const dealer1 = await prisma.dealer.create({
    data: {
      name: 'Prestige Motors',
      location: 'New York, NY',
      phone: '555-111-2222',
      email: 'contact@prestigemotors.com',
    },
  });

  const dealer2 = await prisma.dealer.create({
    data: {
      name: 'Sunset Auto',
      location: 'Los Angeles, CA',
      phone: '555-333-4444',
      email: 'contact@sunsetauto.com',
    },
  });

  // Create a User
  const user1 = await prisma.user.create({
    data: {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123', // In a real app, this would be hashed
    },
  });

  // Create Cars
  const cars = [
    {
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      price: 28500,
      hireRate: 75,
      type: 'Sale',
      image: '/car-images/featured1.png',
      mileage: 15000,
      location: 'New York, NY',
      condition: 'Used',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      features: 'Backup Camera, Bluetooth, Cruise Control',
      dealerId: dealer1.id,
      createdById: user1.id,
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
      location: 'Los Angeles, CA',
      condition: 'Certified Pre-Owned',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      features: 'Leather Seats, Navigation, Sunroof',
      dealerId: dealer2.id,
      createdById: user1.id,
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
      location: 'Austin, TX',
      condition: 'Used',
      transmission: 'Automatic',
      fuelType: 'Electric',
      features: 'Autopilot, Supercharging, Premium Audio',
      dealerId: dealer1.id,
      createdById: user1.id,
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
      location: 'Miami, FL',
      condition: 'Used',
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      features: 'Honda Sensing, Apple CarPlay, LED Headlights',
      dealerId: dealer2.id,
      createdById: user1.id,
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
      location: 'Detroit, MI',
      condition: 'New',
      transmission: 'Manual',
      fuelType: 'Gasoline',
      features: 'Performance Package, Brembo Brakes, MagneRide Damping',
      dealerId: dealer1.id,
      createdById: user1.id,
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
      location: 'Chicago, IL',
      condition: 'Used',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      features: 'Virtual Cockpit, Bang & Olufsen Sound System, Panoramic Sunroof',
      dealerId: dealer2.id,
      createdById: user1.id,
    },
  ];

  for (const car of cars) {
    await prisma.car.create({ data: car });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });