import axios from "axios";
import { api } from "../utils/api";

export class AuthServices {
  signIn = ({ email, password }: any) => {
    return api.post("/users/signin", { email, password });
  };

  getCurrentUser = ({ fresh, ssr }: any) => {
    return api.post(`/users/current-user`, {
      fresh,
    });
  };

  refreshToken = () => {
    return api.post(`/users/refresh-token`);
  };

  signInWithGoogle = async (token) => {
    return api.post("/api/auth", { token });
  };

  updateProfile = async (data) => {
    return api.post(`/users/update`, {
      ...data,
    });
  };

  changePassword = async ({ new_password, old_password }) => {
    return api.post(`/users/change-password`, {
      new_password,
      old_password,
    });
  };
}
