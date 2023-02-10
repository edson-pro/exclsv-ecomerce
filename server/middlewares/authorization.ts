import { NextFunction, Request, Response } from "express";
import db from "../lib/db";

const checkAuthorization = (roles, userId) => {
  const obj = {};
  roles
    .map((e) => {
      return {
        key: "is" + e.charAt(0).toUpperCase() + e.slice(1),
      };
    })
    .forEach((element, ind, ar) => {
      obj[ar[ind].key] = true;
    });

  return db.user
    .findUnique({
      where: {
        id: userId,
      },
    })
    .then((e) => Object.keys(obj).every((i) => e[i]));
};

export const Authorization = (roles: any) => {
  return async function (req: any, res: Response, next: NextFunction) {
    const hasAccess = await checkAuthorization(roles, req?.user?.id);
    if (hasAccess === false) return next("you are not authorized 🖕");
    next();
    try {
    } catch (err) {
      if (err.isJoi) return next(err.message);
      next(err.message);
    }
  };
};
