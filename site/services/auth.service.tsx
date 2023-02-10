import axios from "axios";
import { api } from "../utils/api";

export class AuthServices {
  createAccount = ({ email, password, username }: any) => {
    return axios.post("/api/auth", {
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
      credentials: { email, password, username },
    });
  };

  sendEmailVerification = ({ email }: any) => {
    return api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/send-email-verification`,
      {
        email,
      }
    );
  };

  verifyEmailCode = ({ code }: any) => {
    return api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/verify-email-code`,
      {
        code,
      }
    );
  };

  signIn = ({ email, password }: any) => {
    return axios.post("/api/auth", {
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/users/signin`,
      credentials: { email, password },
    });
  };

  getCurrentUser = ({ fresh }: any) => {
    return api.post(`${process.env.NEXT_PUBLIC_API_URL}/users/current-user`, {
      fresh,
    });
  };

  refreshToken = () => {
    return axios.get(`/api/refresh-token`);
  };

  deleteUser = () => {
    return api.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/delete`);
  };

  logout = () => {
    return axios.post("/api/logout");
  };

  signInWithGoogle = async (token) => {
    return axios.post("/api/auth", {
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/users/google`,
      credentials: { token },
    });
  };

  updateProfile = async (data) => {
    return api.post(`${process.env.NEXT_PUBLIC_API_URL}/users/update`, {
      ...data,
    });
  };

  changePassword = async ({ new_password, old_password }) => {
    return api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`,
      {
        new_password,
        old_password,
      }
    );
  };

  resetPassword = async ({ code, password }) => {
    return api.post(`${process.env.NEXT_PUBLIC_API_URL}/users/reset-password`, {
      code,
      password,
    });
  };

  forgotPassword = async ({ email }) => {
    return api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/forgot-password`,
      {
        email: email,
      }
    );
  };
}
