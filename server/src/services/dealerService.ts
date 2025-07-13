import Dealer from '../models/dealer.model';

export const getAllDealers = async () => {
  return await Dealer.find();
};

export const getDealerById = async (id: string) => {
  return await Dealer.findById(id).populate('cars');
};

export const createDealer = async (data: any) => {
  const dealer = new Dealer(data);
  await dealer.save();
  return dealer;
};