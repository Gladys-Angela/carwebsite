import prisma from '../config/db';

export const createReview = async (carId: number, userId: number, data: any) => {
  const { rating, comment } = data;
  const review = await prisma.review.create({
    data: {
      rating,
      comment,
      car: { connect: { id: carId } },
      user: { connect: { id: userId } },
    },
  });

  // Update car's average rating
  const carReviews = await prisma.review.findMany({ where: { carId } });
  const averageRating = carReviews.reduce((acc, review) => acc + review.rating, 0) / carReviews.length;
  await prisma.car.update({
    where: { id: carId },
    data: { averageRating },
  });

  return review;
};

export const getReviewsByCar = async (carId: number) => {
  return await prisma.review.findMany({
    where: { carId },
    include: { user: true },
  });
};

export const updateReview = async (id: number, data: any) => {
  const { rating, comment } = data;
  const review = await prisma.review.update({
    where: { id },
    data: { rating, comment },
  });

  // Update car's average rating
  const carReviews = await prisma.review.findMany({ where: { carId: review.carId } });
  const averageRating = carReviews.reduce((acc, review) => acc + review.rating, 0) / carReviews.length;
  await prisma.car.update({
    where: { id: review.carId },
    data: { averageRating },
  });

  return review;
};

export const deleteReview = async (id: number) => {
  const review = await prisma.review.delete({ where: { id } });

  // Update car's average rating
  const carReviews = await prisma.review.findMany({ where: { carId: review.carId } });
  const averageRating = carReviews.length > 0 ? carReviews.reduce((acc, review) => acc + review.rating, 0) / carReviews.length : 0;
  await prisma.car.update({
    where: { id: review.carId },
    data: { averageRating },
  });

  return review;
};