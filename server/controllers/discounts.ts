import { NextFunction, Request, Response } from "express";
import db from "../lib/db";
import formatCart from "../utils/formaters/formatCart";
import formatDiscount, {
  formatDiscountUsage,
} from "../utils/formaters/formatDiscount";
import formatUser from "../utils/formaters/formatUser";
import { handlePagination } from "../utils/handlePagination";

export const getDiscount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const discount = await db.discount.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        _count: {
          select: {
            usages: true,
          },
        },
      },
    });

    if (!discount) return next("discount not found");

    return res.json(formatDiscount(discount));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const createDiscount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const exist = await db.discount.findUnique({
      where: {
        code: data.code,
      },
    });

    if (exist) return next("discount exist");

    const discount = await db.discount.create({
      data: {
        code: data.code,
        start: new Date(data.start),
        end: new Date(data.end),
        greater_than: data.greater_than,
        once_usage: data.once_usage,
        type: data.type,
        mode: data.mode,
        value: data.value,
      },
      include: {
        _count: {
          select: {
            usages: true,
          },
        },
      },
    });

    return res.json(formatDiscount(discount));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const updateDiscount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const discount = await db.discount.update({
      where: {
        id: parseInt(id),
      },
      data: {
        start: data.start ? new Date(data.start) : undefined,
        end: data.end ? new Date(data.end) : undefined,
        greater_than: data.greater_than,
        once_usage: data.once_usage,
        type: data.type,
        mode: data.mode,
        value: data.value,
      },
      include: {
        _count: {
          select: {
            usages: true,
          },
        },
      },
    });

    return res.json(formatDiscount(discount));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const deleteDiscount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    await db.discount.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.json({ message: "success" });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const removeDiscount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    await db.discounUsage.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.json({ message: "success" });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getDiscounts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    return handlePagination({
      format: formatDiscount,
      obj: {
        include: {
          _count: {
            select: {
              usages: true,
            },
          },
        },
      },
      req,
      res,
      table: db.discount,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const getDiscountUsages = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const discount_id = req.params.id;

    return handlePagination({
      format: (e) => {
        return {
          id: e.id,
          user: formatUser(e.user),
          order: e.order,
        };
      },
      obj: {
        include: {
          user: true,
          order: {
            select: {
              id: true,
              notes: true,
              status: true,
              createdAt: true,
            },
          },
        },
      },
      filter: {
        discount_id: discount_id,
      },
      req,
      res,
      table: db.discounUsage,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const applyDiscount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = req.params.code;
    const user = req.user;

    //check if discount exist
    const discount = await db.discount.findUnique({
      where: {
        code: code,
      },
    });
    if (!discount) return next("discount not found");

    //check if is auto
    if (discount.mode === "auto")
      return next("discount is applied automatically");

    //check if is active
    if (discount.status === "disabled") return next("discount is disabled");

    //check if discount is not exipired
    const endDate = new Date(discount.end);
    const now = new Date();
    if (now.getTime() > endDate.getTime()) return next("discount is exipired");

    //check if discount is applied on cart
    const cart = await db.cart.findUnique({
      where: {
        id: user.cart.id,
      },
      include: {
        products: {
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
              },
            },
            variant: true,
          },
        },
        discount_usage: true,
      },
    });
    if (!cart) return next("user not found");
    if (cart.discount_usage && !cart.discount_usage.order_id)
      return next("disount already applied on your cart");

    if (discount.once_usage && !cart.discount_usage.order_id)
      return next("discount is already applied in your previous orders");

    //check if discount already used if is to be used ounce
    if (discount.once_usage) {
      const discount_usage = await db.discounUsage.findFirst({
        where: {
          user_id: user.id,
        },
      });
      if (discount_usage && discount_usage.used === true)
        return next("discount is already applied in your previous orders");
    }

    //check if the discount amount is reached
    const formatedCart = formatCart(cart);
    const total_amount = formatedCart.amount;
    if (total_amount < discount.greater_than)
      return next(
        `you must have atleast ${discount.greater_than} Frw in your cart`
      );

    //apply discount on cart
    const usage = await db.discounUsage.create({
      data: {
        used: false,
        user_id: user.id,
        discount_id: discount.id,
        cart_id: cart.id,
      },
      include: {
        discount: true,
        cart: {
          include: {
            products: {
              include: {
                variant: true,
                product: true,
              },
            },
          },
        },
      },
    });

    return res.json(formatDiscountUsage(usage));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
