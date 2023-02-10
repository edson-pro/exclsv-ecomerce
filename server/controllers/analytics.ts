import { Request, Response, NextFunction } from "express";

import db from "../lib/db";

const handleAnalytics = async (req: any, res: Response, next: NextFunction) => {
  try {
    const [users, products, orders, payments] = await db.$transaction([
      db.user.count(),
      db.product.count(),
      db.order.count(),
      db.payment.count(),
    ]);

    return res.json({
      users,
      products,
      orders,
      payments,
    });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export default handleAnalytics;
