import axios from "axios";
import { AuthServices } from "../services/auth.service";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data } = await new AuthServices().refreshToken();
      const access_token = data.access_token;
      localStorage.setItem("token", data.access_token);
      api.defaults.headers["Authorization"] = "Bearer " + access_token;

      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
