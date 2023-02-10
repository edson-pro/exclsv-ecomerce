import { NextFunction, Request, Response } from "express";
import db from "../lib/db";
import formatPayment from "../utils/formaters/formatPayment";
import { handlePagination } from "../utils/handlePagination";

export const getPayment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const payment = await db.payment.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        order: {
          select: {
            status: true,
            id: true,
            createdAt: true,
          },
        },
        user: true,
      },
    });

    if (!payment) return next("payment not found");

    return res.json(formatPayment(payment));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
export const getPayments = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    return handlePagination({
      format: formatPayment,
      obj: {
        include: {
          order: {
            select: {
              status: true,
              id: true,
              createdAt: true,
            },
          },
          user: true,
        },
      },
      req,
      res,
      table: db.payment,
    });
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const createPayment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    // const hash = req.headers["verif-hash"];

    // if (!hash) {
    //   throw new Error("No hash");
    // }

    // const secret_hash = "this-is-exclsv";

    // if (hash !== secret_hash) {
    //   res.status(400).send("Invalid hash");
    // }

    // const { data } = await flw.Transaction.verify({
    //   id: req.body.id,
    // });

    const { meta, amount, status } = data;

    const orderId = meta.orderId;

    const order = await db.order.findUnique({
      where: {
        id: Number(orderId),
      },
    });

    if (!order) return next("order not found");

    const method =
      req.body["event.type"] === "CARD_TRANSACTION"
        ? "card"
        : req.body["event.type"] === "MOBILEMONEYRW_TRANSACTION"
        ? "mtn"
        : "";

    const payment = await db.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status:
          status === "successful"
            ? undefined
            : status === "failed"
            ? "failed"
            : null,
        payment: {
          create: {
            method: method,
            amount: amount,
            status:
              status === "successful"
                ? "paid"
                : status === "failed"
                ? "failed"
                : null,
            user_id: order.user_id,
          },
        },
      },
    });

    return res.json(formatPayment(payment));
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};
