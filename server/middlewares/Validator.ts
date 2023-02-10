import { NextFunction } from "express";
import Validators from "../validators";

export default function (validator: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const valids: any = Validators;
    if (!Validators.hasOwnProperty(validator))
      next(`${validator}' validator is not exist`);
    try {
      await valids[validator].validateAsync(req.body);
      next();
    } catch (err) {
      if (err.isJoi) return next(err.message);
      next(err.message);
    }
  };
}
