import { NextFunction, Request, Response } from "express";
import db from "../lib/db";
import formatBrand from "../utils/formaters/formatBrand";
import formatProduct from "../utils/formaters/formatProduct";
import { handleCursor } from "../utils/handleCursor";
import { handlePagination } from "../utils/handlePagination";

export const getBrand = async (req: any, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const brand = await db.brand.findUnique({
      where: {
        id: id,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!brand) return next("brand not found");

    return res.json(formatBrand(brand));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const createBrand = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const exist = await db.brand.findUnique({
      where: {
        id: data.id,
      },
    });

    if (exist) return next("brand exist");

    const brand = await db.brand.create({
      data: {
        name: data.name,
        id: data.id,
        description: data.description,
        logo: data.logo,
        categories: {
          createMany: {
            data: data.categories.map((e) => {
              return {
                category_id: e,
              };
            }),
          },
        },
      },
    });

    return res.json(formatBrand(brand));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const updateBrand = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    await db.brandCategory.deleteMany({
      where: {
        brand_id: id,
      },
    });

    const brand = await db.brand.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        description: data.description,
        logo: data.logo,
        categories: {
          createMany: {
            data: data.categories.map((e) => {
              return {
                category_id: e,
              };
            }),
          },
        },
      },
    });

    return res.json(formatBrand(brand));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const getAllBrands = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { show, category, query } = req.query;

    const brands = await db.brand.findMany({
      where: {
        name: {
          search: query,
        },
      },
      take: 10,
    });

    return res.json(brands.map((e) => formatBrand(e)));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const getBrands = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    return handlePagination({
      format: formatBrand,
      obj: {},
      req,
      res,
      table: db.brand,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const getBrandProducts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    return handleCursor({
      format: (e) => {
        return formatProduct(e.product);
      },

      obj: {
        include: {
          product: true,
        },
      },
      filter: {
        brand_id: id,
      },
      orderBy: {
        createdAt: "desc",
      },
      req,
      res,
      table: db.product,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const deleteBrand = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await db.brand.delete({
      where: {
        id: id,
      },
    });

    return res.json({ message: "success" });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
