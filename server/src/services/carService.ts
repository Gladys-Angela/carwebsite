import prisma from '../config/db';

export const getAllCars = async (filters: any) => {
  const { make, model, year_from, year_to, price_min, price_max, condition, transmission, fuelType, search, sort_by, page = 1, limit = 10 } = filters;
  const where: any = {};

  if (make) where.make = make;
  if (model) where.model = model;
  if (year_from) where.year = { ...where.year, gte: parseInt(year_from) };
  if (year_to) where.year = { ...where.year, lte: parseInt(year_to) };
  if (price_min) where.price = { ...where.price, gte: parseFloat(price_min) };
  if (price_max) where.price = { ...where.price, lte: parseFloat(price_max) };
  if (condition) where.condition = condition;
  if (transmission) where.transmission = transmission;
  if (fuelType) where.fuelType = fuelType;
  if (search) {
    where.OR = [
      { make: { contains: search, mode: 'insensitive' } },
      { model: { contains: search, mode: 'insensitive' } },
    ];
  }

  const orderBy = sort_by ? { [sort_by.split('_')[0]]: sort_by.split('_')[1] } : {};

  const cars = await prisma.car.findMany({
    where,
    orderBy,
    skip: (page - 1) * limit,
    take: parseInt(limit),
    include: { dealer: true },
  });

  const total = await prisma.car.count({ where });
  return { cars, total, page, limit };
};

export const getFeaturedCars = async () => {
  return await prisma.car.findMany({
    where: { averageRating: { gte: 4.5 } },
    take: 4,
    include: { dealer: true },
  });
};

export const getCarById = async (id: number) => {
  return await prisma.car.findUnique({
    where: { id },
    include: { dealer: true, reviews: { include: { user: true } } },
  });
};

export const createCar = async (data: any, userId: number) => {
  const { dealerId, ...carData } = data;
  return await prisma.car.create({
    data: {
      ...carData,
      dealer: { connect: { id: dealerId } },
      createdBy: { connect: { id: userId } },
    },
  });
};

export const getMakes = async () => {
  const makes = await prisma.car.findMany({
    distinct: ['make'],
    select: { make: true },
  });
  return makes.map(car => car.make);
};

export const getModels = async () => {
  const models = await prisma.car.findMany({
    distinct: ['model'],
    select: { model: true },
  });
  return models.map(car => car.model);
};

export const updateCar = async (id: number, data: any) => {
  return await prisma.car.update({
    where: { id },
    data,
  });
};

export const deleteCar = async (id: number) => {
  return await prisma.car.delete({
    where: { id },
  });
};