import axios from "axios";
import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.setHeader("Set-Cookie", [
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 5, // 1 week
        sameSite: "strict",
        path: "/",
      }),
    ]);

    res.status(200).json({ message: "done" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.response.data.message });
  }
}
