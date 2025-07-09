import prisma from '../config/db';

export const createOrder = async (userId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { car: true } } },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const totalAmount = cart.items.reduce((acc, item) => {
    const price = item.type === 'Sale' ? item.car.price : item.car.hireRate;
    return acc + price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
      items: {
        create: cart.items.map(item => ({
          carId: item.carId,
          type: item.type,
          price: item.type === 'Sale' ? item.car.price : item.car.hireRate,
        })),
      },
    },
    include: { items: true },
  });

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return order;
};

export const getOrderById = async (id: number) => {
  return await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { car: true } } },
  });
};