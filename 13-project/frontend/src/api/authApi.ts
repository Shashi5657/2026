import { axiosInstance } from "./axiosInstance";

export const loginApi = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const signupApi = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const respone = await axiosInstance.post("/auth/signup", data);
  return respone.data;
};
