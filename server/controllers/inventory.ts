import { NextFunction, Response } from "express";
import db from "../lib/db";
import formatInventory from "../utils/formaters/formatInventory";
import { handlePagination } from "../utils/handlePagination";

export const getInventories = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    return handlePagination({
      format: formatInventory,
      obj: {
        include: {
          product: true,
          variant: {
            include: {
              product: true,
            },
          },
        },
      },
      req,
      res,
      table: db.inventory,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getInventory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const inventory = await db.inventory.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        product: true,
        variant: {
          include: {
            product: true,
          },
        },
      },
    });

    return res.json(formatInventory(inventory));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const updateInventory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { stock, low_stock } = req.body;

    const inventory = await db.inventory.update({
      where: {
        id: parseInt(id),
      },
      data: {
        stock: stock,
        low_stock: low_stock,
      },
      include: {
        product: true,
        variant: {
          include: {
            product: true,
          },
        },
      },
    });

    return res.json(formatInventory(inventory));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
