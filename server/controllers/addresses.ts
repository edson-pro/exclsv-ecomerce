import { NextFunction, Request, Response } from "express";
import db from "../lib/db";
import formatAddress from "../utils/formaters/formatAddress";
import { handleCursor } from "../utils/handleCursor";

export const getAddress = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const address = await db.address.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!address) return next("address not found");
    return res.json(formatAddress(address));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const createAddress = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const data = req.body;

    const address = await db.address.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        city: data.city,
        phone: data.phone,
        province: data.province,
        street_1: data.street_1,
        zip_code: data.zip_code,
        user_id: user.id,
        street_2: data.street_2,
      },
    });

    return res.json(formatAddress(address));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const updateAddress = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const address = await db.address.update({
      where: {
        id: parseInt(id),
      },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        city: data.city,
        phone: data.phone,
        province: data.province,
        street_1: data.street_1,
        zip_code: data.zip_code,
        street_2: data.street_2,
      },
    });
    return res.json(formatAddress(address));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const deleteAddress = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await db.address.delete({
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

export const getUserAddresses = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const addresses = await db.address.findMany({
      where: {
        user_id: parseInt(userId),
      },
    });

    return res.json(addresses.map((e) => formatAddress(e)));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
