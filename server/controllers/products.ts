import { NextFunction, Request, Response } from "express";
import db from "../lib/db";
import formatProduct, { formatVariant } from "../utils/formaters/formatProduct";
import formatProductDiscount from "../utils/formaters/formatProductDiscount";
import { handleCursor } from "../utils/handleCursor";
import { handlePagination } from "../utils/handlePagination";

export const getProduct = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const product = await db.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        variants: {
          select: {
            id: true,
            image: true,
            name: true,
            price: true,
            options: true,
            inventory: true,
          },
        },
        categories: {
          include: {
            category: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        brand: true,
        discount: true,
        inventory: true,
        _count: {
          select: {
            orders: true,
            reviews: true,
          },
        },
      },
    });

    if (!product) return next("product not found");

    console.log(product);

    const {
      _avg: { rating },
    } = await db.review.aggregate({
      where: {
        product_id: parseInt(id),
      },
      _avg: {
        rating: true,
      },
    });

    return res.json({
      ...formatProduct(product),
      rating: Math.round(rating * 10) / 10,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const createProduct = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    function convertToSlug(str) {
      //replace all special characters | symbols with a space
      str = str
        .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
        .toLowerCase();

      str = str.replace(/^\s+|\s+$/gm, "");

      str = str.replace(/\s+/g, "-");
      return str;
    }
    const data = await req.body;

    const product = await db.product.create({
      data: {
        brand: data.brand
          ? {
              connectOrCreate: {
                create: {
                  name: data.brand,
                  id: convertToSlug(data.brand),
                  description: "",
                  logo: "",
                  categories: {
                    createMany: {
                      data: data.categories.map((e, index) => {
                        return {
                          category_id: e,
                        };
                      }),
                    },
                  },
                },
                where: {
                  id: convertToSlug(data.brand),
                },
              },
            }
          : undefined,
        content: data.content,
        currency: data.currency,
        free_shipping: data.free_shipping,
        manufacturer: data.manufacturer,
        name: data.name,
        description: data.description,
        status: data.status,
        price: data.price,
        initial_price: data.initial_price,
        images: data.images,
        tags: data.tags,
        metadata: JSON.stringify(data.metadata),
        inventory:
          !data.variants || data?.variants?.length === 0
            ? {
                create: {
                  stock: data.stock,
                  low_stock: data.low_stock,
                },
              }
            : undefined,
        categories: {
          createMany: {
            data: data.categories.map((e, index) => {
              return {
                order: index,
                category_id: e,
              };
            }),
          },
        },
      },
      include: {
        categories: {
          include: {
            category: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    if (data.variants) {
      await Promise.all(
        data.variants.map(async (e) => {
          return await db.variant.create({
            data: {
              image: e.image,
              price: e.price || data.price,
              product_id: product.id,
              name: e.options.map((e) => e.value).join("-"),
              inventory: {
                create: {
                  low_stock: e.low_stock,
                  stock: e.stock,
                },
              },
              options: e.options.map((e) => {
                return {
                  value: e.value,
                  name: e.name,
                };
              }),
            },
          });
        })
      );
    }

    res.json(product);
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const updateProduct = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = await req.body;
    await db.productCategories.deleteMany({
      where: {
        product_id: parseInt(id),
      },
    });
    const product = await db.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        brand: data.brand
          ? {
              connectOrCreate: {
                create: {
                  name: data.brand,
                  id: data.brand,
                  description: "",
                  logo: "",
                  categories: {
                    createMany: {
                      data: data.categories.map((e, index) => {
                        return {
                          category_id: e,
                        };
                      }),
                    },
                  },
                },
                where: {
                  id: data.brand,
                },
              },
            }
          : undefined,
        content: data.content,
        currency: data.currency,
        free_shipping: data.free_shipping,
        manufacturer: data.manufacturer,
        name: data.name,
        price: data.price,
        description: data.description,
        status: data.status,
        images: data.images,
        tags: data.tags,
        initial_price: data.initial_price,
        metadata: JSON.stringify(data.metadata),
        categories: {
          createMany: {
            data: data.categories.map((e, index) => {
              return {
                order: index,
                category_id: e,
              };
            }),
          },
        },
      },
    });
    res.json(formatProduct(product));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const deleteProduct = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await db.product.delete({
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

export const getProducts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    return handlePagination({
      format: formatProduct,
      obj: {
        include: {
          categories: {
            take: 1,
            orderBy: {
              order: "desc",
            },
            include: {
              category: true,
            },
          },
        },
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

export const getAllProducts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = 24, show, cursor, sort } = req.query;
    const obj: any = {
      orderBy: {
        createdAt: "desc",
      },
      take: parseInt(limit),
    };
    if (show === "new-arrivals") {
      obj["orderBy"] = {
        createdAt: "desc",
      };

      obj["take"] = 8;
    }

    if ("cursor" in req.query) {
      return handleCursor({
        format: (e) => {
          return formatProduct(e);
        },
        obj: {
          include: {
            categories: {
              include: {
                category: true,
              },
              take: 1,
              orderBy: {
                order: "desc",
              },
            },
            discount: true,
          },
          orderBy:
            sort === "best-selling"
              ? {
                  orders: {
                    _count: "desc",
                  },
                }
              : undefined,
        },
        req,
        res,
        table: db.product,
      });
    } else {
      const products = await db.product.findMany({
        ...obj,
        include: {
          categories: {
            take: 1,
            orderBy: {
              order: "desc",
            },
            include: {
              category: true,
            },
          },
          discount: true,
        },
      });
      return res.json(products.map((e) => formatProduct(e)));
    }
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const createVariant = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const data = req.body;

    const variant = await db.variant.create({
      data: {
        image: data.image,
        price: data.price,
        product_id: parseInt(productId),
        name: data.options.map((e) => e.value).join("-"),
        options: data.options,
        inventory: {
          create: {
            low_stock: Number(data.low_stock),
            stock: Number(data.stock),
          },
        },
      },
    });

    return res.json(formatVariant(variant));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const updateVariant = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const variant = await db.variant.update({
      where: {
        id: parseInt(id),
      },
      data: {
        image: data.image,
        price: data.price,
      },
    });

    return res.json(formatVariant(variant));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getVariant = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const variant = await db.variant.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return res.json(formatVariant(variant));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getVariants = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const variants = await db.variant.findMany({
      where: {
        product_id: parseInt(productId),
      },
    });
    return res.json(variants.map((e) => formatVariant(e)));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const deleteVariant = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await db.variant.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.json({ message: "true" });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getProductDiscount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const discount = await db.productDiscount.findUnique({
      where: {
        product_id: parseInt(productId),
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    if (!discount) return next("discount not found");

    return res.json(formatProductDiscount(discount));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const updateProductDiscount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const { value, type, end, start } = req.body;

    const discount = await db.productDiscount.update({
      where: {
        product_id: parseInt(productId),
      },
      data: {
        end: end ? new Date(end) : undefined,
        start: start ? new Date(start) : undefined,
        type: type,
        value: value,
      },
    });

    return res.json(formatProductDiscount(discount));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const createProductDiscount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const { value, type, end, start } = req.body;

    const discount = await db.productDiscount.create({
      data: {
        product_id: parseInt(productId),
        end: new Date(end),
        start: new Date(start),
        type: type,
        value: value,
      },
    });

    return res.json(formatProductDiscount(discount));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const deleteProductDiscount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    await db.productDiscount.delete({
      where: {
        product_id: parseInt(productId),
      },
    });

    return res.json({ message: "true" });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getBestDeals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 5);

    const products = await db.deal.findMany({
      select: {
        id: true,
        product: {
          include: {
            discount: true,
            categories: {
              include: {
                category: true,
              },
              take: 1,
              orderBy: {
                order: "desc",
              },
            },
          },
        },
        exipiry: true,
        created_at: true,
        product_id: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 5,
    });

    return res.json(
      products.map((e) => {
        return {
          createdAt: e.created_at,
          exipiry: e.exipiry,
          id: e.id,
          product: formatProduct(e.product),
        };
      })
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createBestDeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, exipiry } = req.body;
    const product = await db.deal.create({
      data: {
        product_id: Number(productId),
        exipiry: exipiry,
      },
    });
    return res.json(product);
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const updateDeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, exipiry } = req.body;
    const { id } = req.params;
    const product = await db.deal.update({
      where: {
        id: Number(id),
      },
      data: {
        product_id: Number(productId),
        exipiry: exipiry,
      },
    });
    return res.json(product);
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const deleteBestDeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await db.deal.delete({
      where: {
        id: Number(id),
      },
    });
    return res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const getBestDeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deal = await db.deal.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        product: true,
      },
    });
    return res.json({
      createdAt: deal.created_at,
      exipiry: deal.exipiry,
      id: deal.id,
      product: formatProduct(deal.product),
    });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};
