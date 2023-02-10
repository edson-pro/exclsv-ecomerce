import { NextFunction, Request, Response } from "express";
import db from "../lib/db";
import clean from "../utils/clean";
import formatProduct from "../utils/formaters/formatProduct";
import getRefines from "../utils/getRefines";
import { handleCursor } from "../utils/handleCursor";
import { handlePagination } from "../utils/handlePagination";

export const handleSearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sort, filter } = getRefines(req);
    console.log(filter);

    return handlePagination({
      format: (e) => {
        return formatProduct(e);
      },
      extra: {},
      obj: {},
      filter: clean(filter),
      orderBy: sort,
      req,
      res,
      table: db.product,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
