import { NextFunction, Request, Response } from "express";
import db from "../lib/db";
import formatSupplier from "../utils/formaters/formatSupplier";
import { handlePagination } from "../utils/handlePagination";

export const getSupplier = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const supplier = await db.supplier.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!supplier) return next("supplier not found");
    return res.json(formatSupplier(supplier));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const createSupplier = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const supplier = await db.supplier.create({
      data: data,
    });

    return res.json(formatSupplier(supplier));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const updateSupplier = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const supplier = await db.supplier.update({
      where: {
        id: parseInt(id),
      },
      data: data,
    });
    return res.json(formatSupplier(supplier));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const deleteSupplier = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await db.supplier.delete({
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

export const getSuppliers = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    return handlePagination({
      format: formatSupplier,
      obj: {},
      req,
      res,
      table: db.supplier,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
