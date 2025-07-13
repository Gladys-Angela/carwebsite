import Review from '../models/review.model';
import Car from '../models/car.model';

export const createReview = async (carId: string, userId: string, data: any) => {
  const { rating, comment } = data;
  const review = new Review({
    rating,
    comment,
    car: carId,
    user: userId,
  });
  await review.save();

  // Update car's average rating
  const car = await Car.findById(carId);
  if (car) {
    const reviews = await Review.find({ car: carId });
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    car.averageRating = averageRating;
    await car.save();
  }

  return review;
};

export const getReviewsByCar = async (carId: string) => {
  return await Review.find({ car: carId }).populate('user');
};

export const updateReview = async (id: string, data: any) => {
  const { rating, comment } = data;
  const review = await Review.findByIdAndUpdate(id, { rating, comment }, { new: true });

  // Update car's average rating
  if (review) {
    const car = await Car.findById(review.car);
    if (car) {
      const reviews = await Review.find({ car: review.car });
      const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      car.averageRating = averageRating;
      await car.save();
    }
  }

  return review;
};

export const deleteReview = async (id: string) => {
  const review = await Review.findByIdAndDelete(id);

  // Update car's average rating
  if (review) {
    const car = await Car.findById(review.car);
    if (car) {
      const reviews = await Review.find({ car: review.car });
      const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;
      car.averageRating = averageRating;
      await car.save();
    }
  }

  return review;
};