import { NextFunction, Request, Response } from "express";
import { userInfo } from "os";
import db from "../lib/db";
import formatAddress from "../utils/formaters/formatAddress";
import formatOrder from "../utils/formaters/formatOrder";
import formatPayment from "../utils/formaters/formatPayment";
import { formatFilters, handleCursor } from "../utils/handleCursor";

export const getMyOrders = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (req.query.all) {
      const filters = formatFilters({
        name: "id",
        filter: {
          user_id: user.id,
        },
        orderBy: "createdAt",
        filters: ["status", "date"],
        query: req.query.query,
        queryObj: req.query,
      });

      const orders = await db.order.findMany({
        where: filters["where"],
        include: {
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
        },
      });

      return res.json(orders.map((e) => formatOrder(e)));
    } else {
      return handleCursor({
        format: formatOrder,
        obj: {
          include: {
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
          },
        },
        filters: ["status", "date"],
        name: "id",
        filter: {
          user_id: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        req,
        res,
        table: db.order,
      });
    }
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getMyPayments = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    return handleCursor({
      format: formatPayment,
      obj: {
        include: {
          order: {
            select: {
              status: true,
              id: true,
              createdAt: true,
            },
          },
        },
      },
      filter: {
        user_id: user.id,
      },
      req,
      res,
      table: db.payment,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getMyAddresses = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const addresses = await db.address.findMany({
      where: {
        user_id: user.id,
      },
    });

    return res.json(addresses.map((e) => formatAddress(e)));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
