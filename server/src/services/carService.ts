import Car from '../models/car.model';

export const getAllCars = async (filters: any) => {
  const { make, model, year_from, year_to, price_min, price_max, condition, transmission, fuelType, search, sort_by, page = 1, limit = 10 } = filters;
  const query: any = {};

  if (make) query.make = make;
  if (model) query.model = model;
  if (year_from) query.year = { ...query.year, $gte: parseInt(year_from) };
  if (year_to) query.year = { ...query.year, $lte: parseInt(year_to) };
  if (price_min) query.price = { ...query.price, $gte: parseFloat(price_min) };
  if (price_max) query.price = { ...query.price, $lte: parseFloat(price_max) };
  if (condition) query.condition = condition;
  if (transmission) query.transmission = transmission;
  if (fuelType) query.fuelType = fuelType;
  if (search) {
    query.$or = [
      { make: { $regex: search, $options: 'i' } },
      { model: { $regex: search, $options: 'i' } },
    ];
  }

  const sort: any = {};
  if (sort_by) {
    const [field, order] = sort_by.split('_');
    sort[field] = order === 'asc' ? 1 : -1;
  }

  const cars = await Car.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate('dealer');

  const total = await Car.countDocuments(query);
  return { cars, total, page, limit };
};

export const getFeaturedCars = async () => {
  return await Car.find({ averageRating: { $gte: 4.5 } })
    .limit(4)
    .populate('dealer');
};

export const getCarById = async (id: string) => {
  return await Car.findById(id).populate('dealer').populate({
    path: 'reviews',
    populate: {
      path: 'user',
      model: 'User',
    },
  });
};

export const createCar = async (data: any, userId: string) => {
  const car = new Car({
    ...data,
    createdBy: userId,
  });
  await car.save();
  return car;
};

export const getMakes = async () => {
  return await Car.distinct('make');
};

export const getModels = async () => {
  return await Car.distinct('model');
};

export const updateCar = async (id: string, data: any) => {
  return await Car.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCar = async (id: string) => {
  return await Car.findByIdAndDelete(id);
};