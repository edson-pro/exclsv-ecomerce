import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export const Authentication = (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return next("Missing headers");
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next("Missing token");
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};
