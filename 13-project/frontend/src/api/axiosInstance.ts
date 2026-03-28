import axios from "axios";
import { getAccessToken } from "@/services/authStorage";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.1.7:5000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
