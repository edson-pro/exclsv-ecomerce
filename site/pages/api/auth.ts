import axios from "axios";
import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const credentials = req.body.credentials;
    const endpoint = req.body.endpoint;
    console.debug("credentials");
    const result = await axios.post(endpoint, credentials);
    const cookies = result.headers["set-cookie"][0];
    const { refresh_token } = cookie.parse(cookies);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err?.response?.data?.message });
  }
}
