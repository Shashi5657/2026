import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.1.7:5000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
  