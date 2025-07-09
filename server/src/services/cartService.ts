import prisma from '../config/db';

export const getCart = async (userId: number) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { car: true } } },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: { items: { include: { car: true } } },
    });
  }

  return cart;
};

export const addToCart = async (userId: number, carId: number, type: string, quantity: number) => {
  const cart = await getCart(userId);

  const existingItem = cart.items.find(item => item.carId === carId && item.type === type);

  if (existingItem) {
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    return await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        carId,
        type,
        quantity,
      },
    });
  }
};

export const removeFromCart = async (itemId: number) => {
  return await prisma.cartItem.delete({
    where: { id: itemId },
  });
};

export const updateCartItem = async (itemId: number, quantity: number) => {
  return await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });
};