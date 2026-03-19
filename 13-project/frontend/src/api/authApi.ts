import { axiosInstance } from "./axiosInstance";

export const loginApi = async (payload: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};

export const signupApi = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const respone = await axiosInstance.post("/auth/signup", payload);
  return respone.data;
};
