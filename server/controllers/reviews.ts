import { NextFunction, Response, Request } from "express";
import db from "../lib/db";
import formatReview from "../utils/formaters/formatReview";
import { handleCursor } from "../utils/handleCursor";

export const createReview = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const user = req.user;

    // const reviewExist = await db.review.findFirst({
    //   where: {
    //     user_id: user.id,
    //     product_id: parseInt(productId),
    //   },
    // });

    // if (reviewExist) return next("review exist");

    const review = await db.review.create({
      data: {
        message: data.review,
        rating: data.rating,
        user_id: user.id,
        product_id: parseInt(productId),
      },
      include: {
        user: true,
      },
    });

    return res.status(200).json(formatReview(review));
  } catch (error) {
    console.log(error);
    next(error.message);
  }
};

export const getReviews = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const { sort = "high-rating" } = req.query;
    const orderBy = {};

    if (sort === "high-rating") {
      orderBy["rating"] = "desc";
    } else if (sort === "low-rating") {
      orderBy["rating"] = "asc";
    } else if (sort === "date") {
      orderBy["createdAt"] = "desc";
    }

    return handleCursor({
      format: formatReview,
      obj: {
        include: {
          user: true,
        },
      },
      orderBy,
      filter: {
        product_id: parseInt(productId),
      },
      req,
      res,
      table: db.review,
    });
  } catch (error) {
    console.log(error);
    next(error.message);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await db.review.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    next(error.message);
  }
};

export const getReviewSummary = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const summary = await db.review.groupBy({
      by: ["rating"],
      where: {
        product_id: parseInt(productId),
      },
      _count: {
        rating: true,
      },
    });

    const reviews = await db.review.count({
      where: {
        product_id: parseInt(productId),
      },
    });

    const ss = Array(5)
      .fill(null)
      .map((e, index) => {
        const sum = summary.find((i) => i?.rating === index + 1);

        return {
          rating: sum?.rating || 0,
          count: sum?._count?.rating || 0,
          percentage: Math.round((sum?._count?.rating * 100) / reviews) || 0,
        };
      });

    console.log(ss);

    return res.json({
      summary: summary.map((e) => {
        return {
          rating: e.rating,
          count: e._count.rating,
          percentage: Math.round((e._count.rating * 100) / reviews),
        };
      }),
    });
  } catch (error) {
    console.log(error);
    next(error.message);
  }
};
