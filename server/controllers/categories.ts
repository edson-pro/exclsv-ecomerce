import { NextFunction, Request, Response } from "express";
import db from "../lib/db";
import clean from "../utils/clean";
import formatBrand from "../utils/formaters/formatBrand";
import formatCategory from "../utils/formaters/formatCategory";
import formatProduct from "../utils/formaters/formatProduct";
import getRefines from "../utils/getRefines";
import { handleCursor } from "../utils/handleCursor";
import { handlePagination } from "../utils/handlePagination";
import { nanoid } from "nanoid";
export const getCategory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const category = await db.category.findUnique({
      where: {
        id: id,
      },

      include: {
        parent: {
          include: {
            parent: {
              include: {
                parent: {
                  include: {
                    parent: true,
                  },
                },
              },
            },
          },
        },
        subCategories: true,
      },
    });

    if (!category) return next("category not found");

    return res.json({
      ...formatCategory({ ...category }),
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const createCategory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const category = await db.category.create({
      data: {
        name: data.name,
        id: data.id + "-" + nanoid(4),
        description: data.description,
        photo: data.photo,
        parent_id: data.parent_id,
      },
      include: {
        parent: true,
      },
    });

    return res.json(formatCategory(category));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const updateCategory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const category = await db.category.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        description: data.description,
        photo: data.photo,
        parent_id: data.parent_id,
      },
      include: {
        parent: true,
      },
    });

    return res.json(formatCategory(category));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const getAllCategories = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { show, query, flat, nested } = req.query;
    const obj = {};
    if (show === "main") {
      obj["where"] = {
        parent_id: null,
      };
    }
    if (query) {
      obj["where"] = {
        name: {
          search: query,
        },
      };
    }

    if (nested) {
      obj["include"] = {
        subCategories: true,
      };
    }

    const categories = await db.category.findMany({
      ...obj,
    });

    return res.json(categories.map((e) => formatCategory(e)));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const getCategories = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    return handlePagination({
      format: (e) => {
        return formatCategory(e);
      },
      obj: {
        include: {
          parent: true,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      req,
      res,
      table: db.category,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const getCategoryBrands = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    return handleCursor({
      format: (e) => {
        return formatBrand(e.brand);
      },

      obj: {
        include: {
          brand: true,
        },
      },
      filter: {
        category_id: id,
      },

      req,
      res,
      table: db.brandCategory,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const getCategoryProducts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { simple } = req.query;

    const { sort, filter } = getRefines(req);

    const filterQueries = req.query;

    if ("cursor" in req.query) {
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
          category_id: id,
          product: clean(filter),
        },
        orderBy: {
          product: sort,
        },
        req,
        res,
        table: db.productCategories,
      });
    } else if (simple) {
      const { not } = req.query;

      const products = await db.productCategories.findMany({
        where: {
          category_id: id,
          NOT: {
            product: {
              id: parseInt(not),
            },
          },
        },
        include: {
          product: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
        take: 6,
      });

      return res.json(products.map((e) => formatProduct(e.product)));
    } else {
      const subCategories = await db.category.findMany({
        where: {
          parent_id: id,
        },
      });

      const brands = await db.brandCategory.findMany({
        where: {
          category_id: id,
        },
        take: 12,
        include: {
          brand: true,
        },
      });

      const categories = await db.category.findMany({
        where: {
          id: {
            in: filterQueries.categories,
          },
        },
        orderBy: {
          parent_id: "asc",
        },
      });
      return handlePagination({
        format: (e) => {
          return formatProduct(e.product);
        },
        extra: {
          subCategories: subCategories.map((e) => formatCategory(e)),
          brands: brands.map((e) => formatBrand(e.brand)),
          categories: categories.map((e) => formatCategory(e)),
        },
        obj: {
          include: {
            product: true,
          },
        },
        noQuery: true,
        filter: {
          category_id: id,
          product: clean(filter),
        },
        orderBy: {
          product: sort,
        },
        req,
        res,
        table: db.productCategories,
      });
    }
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getCategoriesProducts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categories, nots } = req.query;

    const products = await db.productCategories.findMany({
      where: {
        category_id: {
          in: categories,
        },
        product: {
          id: {
            notIn: nots.map((e) => parseInt(e)),
          },
        },
      },
      orderBy: {
        product: {
          name: "desc",
        },
      },
      include: {
        product: {
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      take: 8,
    });

    return res.json(products.map((e) => formatProduct(e.product)));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const deleteCategory = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await db.category.delete({
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
