import prisma from '../config/db';

export const getAllDealers = async () => {
  return await prisma.dealer.findMany();
};

export const getDealerById = async (id: number) => {
  return await prisma.dealer.findUnique({
    where: { id },
    include: { cars: true },
  });
};

export const createDealer = async (data: any) => {
  return await prisma.dealer.create({
    data,
  });
};