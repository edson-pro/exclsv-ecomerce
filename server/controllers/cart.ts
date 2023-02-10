import { NextFunction, Response } from "express";
import db from "../lib/db";
import formatCart, { formatCartItem } from "../utils/formaters/formatCart";

export const getCart = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    const cart = await db.cart.findUnique({
      where: {
        user_id: user.id,
      },
      include: {
        discount_usage: {
          include: {
            discount: true,
          },
        },
        products: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            quantity: true,
            id: true,
            product: {
              select: {
                id: true,
                images: true,
                price: true,
                brand: true,
                free_shipping: true,
                name: true,
                currency: true,
                discount: true,
              },
            },

            variant: true,
          },
        },
      },
    });

    if (!cart) return next("cart not found");

    return res.json(formatCart(cart));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const clearCart = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const cart = await db.cart.findUnique({
      where: {
        id: user.cart.id,
      },
      include: { discount_usage: true },
    });

    await db.cartProducts.deleteMany({
      where: {
        cart_id: cart.id,
      },
    });

    return res.json({ message: "success" });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getCartItems = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const cart = user.cart;

    const items = await db.cartProducts.findMany({
      where: {
        cart_id: parseInt(cart.id),
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        quantity: true,
        id: true,
        product: {
          select: {
            id: true,
            images: true,
            price: true,
            free_shipping: true,
            name: true,
            currency: true,
          },
        },
        variant: true,
      },
    });

    return res.json(items.map((e) => formatCartItem(e)));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const addItemToCart = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id, quantity } = req.body;
    const user = req.user;
    const cart = user.cart;

    const cartItem = await db.cartProducts.create({
      data: {
        cart_id: cart.id,
        product_id: product_id,
        quantity: quantity || 1,
        variant_id: req.body.variant_id,
      },
      include: {
        product: true,
        variant: true,
      },
    });

    return res.json(formatCartItem(cartItem));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const removeItemToCart = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId } = req.params;

    await db.cartProducts.delete({
      where: {
        id: parseInt(itemId),
      },
    });

    return res.json({ message: "success" });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const updateCartItem = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId } = req.params;

    const { quantity } = req.body;

    const cartItem = await db.cartProducts.update({
      where: {
        id: parseInt(itemId),
      },
      data: {
        quantity: quantity || 1,
      },
      include: {
        product: true,
      },
    });

    return res.json(formatCartItem(cartItem));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getCartItem = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId } = req.params;

    const cartItem = await db.cartProducts.findUnique({
      where: {
        id: parseInt(itemId),
      },
      include: {
        product: true,
        variant: true,
      },
    });

    return res.json(formatCartItem(cartItem));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
