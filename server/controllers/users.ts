import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import db from "../lib/db";
import sendEmail from "../utils/sendEmail";
import { handlePagination } from "../utils/handlePagination";

dotenv.config();
const SECRET = process.env.SECRET;

function findUserById(id) {
  return db.user
    .findUnique({
      where: {
        id,
      },
      include: {
        cart: true,
      },
    })
    .then((e) => {
      if (e?.isDeleted) return null;
      return e;
    });
}

function findUserByEmail(email) {
  return db.user
    .findUnique({
      where: {
        email,
      },
      include: {
        cart: true,
      },
    })
    .then((e) => {
      if (e?.isDeleted) return null;
      return e;
    });
}

const formatProfile = (user: any) => {
  let roles = [];
  if (user.isAdmin) {
    roles = [...roles, "admin"];
  }

  return {
    id: user._id || user.id || "",
    email: user.email,
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    username: user.username,
    photo: user?.photo || "",
    phone: user.phone || "",
    country: user.country || "",
    birth: user.birth || "",
    gender: user.gender || "",
    phoneVerfied: user.phoneVerfied || false,
    emailVerified: user.emailVerified || false,
    address: user?.address || "",
    defaultAddressId: user?.defaultAddressId || "undefined",
    roles: roles,
    cart: user.cart
      ? {
          id: user.cart.id,
        }
      : undefined,
  };
};
const generateOTP = (otp_length) => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const sendBack = (res: Response, user) => {
  const userData = formatProfile(user);
  const access_token = jwt.sign(userData, SECRET, {
    expiresIn: "15m",
  });
  const refresh_token = jwt.sign(userData, SECRET, {
    expiresIn: "7d",
  });

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ ...userData, access_token });
};

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body; //Coming from formData

  try {
    const user = await findUserByEmail(email);

    if (!user) return next("User not found");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password || ""
    );

    if (!isPasswordCorrect) return next("Password is incorrect");

    sendBack(res, user);
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (user) return next("Email already in use.");

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        cart: {
          create: {},
        },
      },
      include: {
        cart: true,
      },
    });

    sendBack(res, result);
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const googleSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.body.token;

  try {
    const result: any = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const user = await db.user.findUnique({
      where: {
        email: result.getPayload().email,
      },
      include: {
        cart: true,
      },
    });

    if (user) {
      sendBack(res, user);
    } else {
      const user = await db.user.create({
        data: {
          email: result.getPayload().email,
          username: result.getPayload()?.name || "",
          photo: result.getPayload()?.picture || "",
          provider: "google",
          cart: {
            create: {},
          },
        },
        include: {
          cart: true,
        },
      });

      sendBack(res, user);
    }
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oldrefreshToken = req.headers.authorization.split(" ")[1];

    if (!oldrefreshToken) {
      return next("no refresh token");
    }

    const result: any = await jwt.verify(oldrefreshToken, process.env.SECRET);

    const user = await findUserById(result.id);

    if (!user) return next("user not found");

    sendBack(res, user);
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const appleSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next("provider not found");
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token = buffer.toString("hex");

      const user = await db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) return next("User does not exist in our database");

      const link = `${process.env.CLIENT_HOST}/reset-password?code=${token}`;
      console.log(link);

      await db.passwordResets.create({
        data: {
          email: user.email,
          token: token,
        },
      });

      res.json({ message: "check your email" });
    });
  } catch (error) {
    return next(error.message);
  }
};

export const getCurrentUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (req.body?.fresh === true) {
    const user = await findUserById(req.user.id);
    sendBack(res, user);
  } else {
    return res.json(req.user);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newPassword = req.body.password;
  const sentToken: string = req.body.token;

  try {
    const reset = await db.passwordResets.findFirst({
      where: {
        token: sentToken,
      },
    });

    if (!reset) return next("reset code is invalid");

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await db.user.update({
      where: {
        email: reset.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResets.delete({
      where: {
        id: reset.id,
      },
    });

    return res.json({ message: "password reseted success" });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const update = async (req: any, res: Response, next: NextFunction) => {
  try {
    const info = req.body;
    const user: any = req.user;

    const newUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: info,
      include: {
        cart: true,
      },
    });

    const formated = formatProfile(newUser);

    return res.status(200).json(formated);
  } catch (error) {
    console.log(error);
    next(error.message);
  }
};

export const deleteUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = req.user;

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isDeleted: true,
      },
    });

    return res.json({ message: "deleted success" });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const deleteUserById = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    console.log(id);

    await db.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.json({ message: "deleted success" });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const changePassword = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;

    const currentUser = await findUserById(user.id);

    if (!currentUser) return next("user not found");

    const isPasswordCorrect = await bcrypt.compare(
      old_password,
      currentUser.password || ""
    );

    if (!isPasswordCorrect) return next("old password is not collect");

    const hashedPassword = await bcrypt.hash(new_password, 12);

    await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    next(error.message);
  }
};

export const sendEmailVerification = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return next("User does not exist in our database");

    const code = generateOTP(6);
    console.log(code);
    await sendEmail({
      email: "librarwanda@gmail.com",
      html: `<!DOCTYPE html>
<html lang="en">
<head> 
    <title>Verify your email address</title>
</head>
<body>
    This is the verification code ${code}
</body>
</html>`,
      subject: "Verify your email address",
    });

    await db.emailVerifications.create({
      data: {
        email: user.email,
        code: Number(code),
      },
    });

    return res.json({ message: "check your inbox success" });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const verifyEmailCode = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = req.body.code;

    const verify = await db.emailVerifications.findFirst({
      where: {
        code: code,
      },
    });

    if (verify.code !== code) next("invalid verification code");

    await db.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        emailVerified: true,
      },
    });

    return res.json({ message: "verification success" });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const getUserProfile = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await findUserById(Number(id));
    if (!user) return next("user not found");

    res.status(200).json({
      id: user.id || "",
      email: user.email,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      username: user.username,
      photo: user?.photo || "",
      phone: user.phone || "",
      country: user.country || "",
      birth: user.birth || "",
      gender: user.gender || "",
      phoneVerfied: user.phoneVerfied || false,
      emailVerified: user.emailVerified || false,
      address: user?.address || "",
    });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

export const getUsers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const formatUser = (user) => {
      let roles = ["user"];
      if (user.isAdmin) {
        roles = [...roles, "admin"];
      }
      if (user.isSeller) {
        roles = [...roles, "seller"];
      }
      return {
        id: user.id,
        name: user.username,
        photo: user?.photo || "",
        email: user.email,
        phone: user?.phone || "",
        country: user?.country || "",
        createdAt: user?.createdAt,
        gender: user?.gender || "",
        roles,
      };
    };
    return handlePagination({
      format: formatUser,
      obj: {},
      req,
      res,
      table: db.user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const makeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const exist = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!exist) return next("user is not found");
    const user = await db.user.update({
      where: {
        email: email,
      },
      data: {
        isAdmin: true,
      },
    });

    if (!user) return next("failed to make admin");

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};
