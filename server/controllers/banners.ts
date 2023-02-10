import { NextFunction, Response } from "express";
import db from "../lib/db";
import formatBanner from "../utils/formaters/formatBanner";
import { handlePagination } from "../utils/handlePagination";

export const getBanners = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    return handlePagination({
      format: formatBanner,
      obj: {},
      req,
      res,
      table: db.banner,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const createBanner = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const banner = await db.banner.create({
      data: {
        title: data.title,
        tag: data.tag,
        subtitle: data.subtitle,
        image: data.image,
        type: data.type,
        action: data.action,
        link: data.link,
      },
    });

    return res.json(formatBanner(banner));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getBanner = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const banner = await db.banner.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!banner) return next("banner not found");

    return res.json(formatBanner(banner));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const updateBanner = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const banner = await db.banner.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: data.title,
        tag: data.tag,
        subtitle: data.subtitle,
        image: data.image,
        type: data.type,
        action: data.action,
        link: data.link,
      },
    });

    return res.json(formatBanner(banner));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const getAllBanners = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { show } = req.query;
    const obj = {};
    if (show) {
      obj["where"] = {
        type: show,
      };
    }
    const banners = await db.banner.findMany({
      ...obj,
    });

    return res.json(banners.map((e) => formatBanner(e)));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const deleteBanner = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await db.banner.delete({
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
