import { NextFunction, Response } from "express";
import db from "../lib/db";
import formatInventory from "../utils/formaters/formatInventory";
import formatTransfer from "../utils/formaters/formatTransfer";
import { handlePagination } from "../utils/handlePagination";

export const createTransfer = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const transfer = await db.transfer.create({
      data: {
        status: "pending",
        tags: data.tags,
        estimated_arrival: data.estimated_arrival,
        products: {
          createMany: {
            data: data.products.map((e) => {
              return {
                product_id: e.product_id,
                variant_id: e.variant_id,
                quantity: e.quantity,
              };
            }),
          },
        },
      },
      include: {
        products: true,
      },
    });

    return res.json(formatTransfer(transfer));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getTransfers = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    return handlePagination({
      format: formatTransfer,
      obj: {},
      req,
      res,
      table: db.transfer,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getTransfer = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const transfer = await db.transfer.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        products: {
          include: {
            product: true,
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    return res.json(formatTransfer(transfer));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const updateTransfer = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { estimated_arrival, tags } = req.body;

    const transfer = await db.transfer.update({
      where: {
        id: parseInt(id),
      },
      data: {
        estimated_arrival: estimated_arrival,
        tags: tags,
      },
      include: {
        products: true,
      },
    });

    return res.json(formatTransfer(transfer));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
