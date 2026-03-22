import { axiosInstance } from "./axiosInstance";

export const loginApi = async (payload: {
  email: string;
  password: string;
}) => {
  console.log("LOGIN PAYLOAD", payload);
  const response = await axiosInstance.post("/auth/login", payload);
  console.log("LOGIN RESPONSE", response.data);
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
