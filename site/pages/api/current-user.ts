import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      console.debug(req.headers.authorization);
      if (!req.headers.authorization)
        return res.status(401).json({ message: "missing headers" });
      const token = req.headers.authorization.split(" ")[1];
      if (!token) return res.status(401).json({ message: "missing token" });
      const data = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);
      if (!data) return res.status(401).json({ message: "no user found" });
      return res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: err.message });
  }
}
