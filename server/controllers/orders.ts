import { NextFunction, Response } from "express";
import db from "../lib/db";
import formatCart from "../utils/formaters/formatCart";
import formatOrder from "../utils/formaters/formatOrder";
import { formatFilters } from "../utils/handleCursor";
import { handlePagination } from "../utils/handlePagination";

const loadCart = async (req, res, next) => {
  const user = req.user;
  const cart = await db.cart.findUnique({
    where: {
      user_id: user.id,
    },
    include: {
      products: {
        include: {
          product: {
            include: {
              discount: true,
            },
          },
        },
      },
      discount_usage: {
        include: {
          discount: true,
        },
      },
    },
  });
  if (!cart) return next("cart not found");
  return cart;
};

export const getOrder = async (req: any, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const order = await db.order.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        address: true,
        payment: true,
        products: {
          include: {
            discount: true,
            product: {
              select: {
                id: true,
                name: true,
                images: true,
                price: true,
                brand: true,
              },
            },
            variant: true,
          },
        },
        user: true,
        discount: {
          include: {
            discount: true,
          },
        },
      },
    });

    if (!order) return next("order not found");

    console.log(order.products);

    return res.json(formatOrder(order));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const createOrder = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const data = req.body;

    let products = [];
    let orderCart = null;

    const isExp = (end) => {
      var d1 = new Date();
      var d2 = new Date(end);
      return d1.getTime() > d2.getTime();
    };

    if (data?.products) {
      const prods = await db.product.findMany({
        where: {
          id: {
            in: data.products.map((e) => e.id),
          },
        },
        include: {
          discount: true,
        },
      });
      products = prods.map((e) => {
        const prod = data?.products.find((i) => i.id === e.id);
        return {
          variant_id: prod.variant_id,
          product_id: e.id,
          quantity: prod.quantity,
          discount_id:
            e?.discount && !isExp(e?.discount?.end)
              ? e?.discount.id
              : undefined,
        };
      });
    } else {
      const cart = await loadCart(req, res, next);
      products = formatCart(cart).items.map((e) => {
        return {
          variant_id: e.variant?.id,
          product_id: e.product?.id,
          quantity: e.quantity,
          discount_id:
            e?.product?.discount && !isExp(e?.product?.discount?.end)
              ? e?.product?.discount.id
              : undefined,
        };
      });
      orderCart = cart;
    }

    const order = await db.order.create({
      data: {
        user_id: user.id,
        address_id: data.address_id,
        notes: data.notes,
        status: "pending",
        products: {
          createMany: {
            data: products,
          },
        },
        discount: orderCart.discount_usage
          ? {
              connect: {
                id: parseInt(orderCart.discount_usage.id),
              },
            }
          : undefined,
      },
      include: {
        address: true,
        payment: true,
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
                price: true,
                brand: true,
              },
            },
            variant: true,
          },
        },
        discount: {
          include: {
            discount: true,
          },
        },
        user: true,
      },
    });
    if (order.discount) {
      await db.discounUsage.update({
        where: {
          id: order.discount.id,
        },
        data: {
          cart: {
            disconnect: true,
          },
        },
      });
    }
    return res.json(formatOrder(order));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const updateOrder = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const id = req.params.id;

    const order = await db.order.update({
      where: {
        id: parseInt(id),
      },
      data: {
        address_id: data.address_id,
        notes: data.notes,
        status: data.status,
      },
      include: {
        address: true,
        payment: true,
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
                price: true,
                brand: true,
              },
            },
            variant: true,
          },
        },
        user: true,
      },
    });

    return res.json(formatOrder(order));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const deleteOrder = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await db.order.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getOrders = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    return handlePagination({
      name: "id",
      format: formatOrder,
      obj: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      },
      filters: ["status", "date", "type"],
      req,
      res,
      table: db.order,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
