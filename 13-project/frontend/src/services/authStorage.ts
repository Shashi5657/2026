import { User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "access_token";
const USER_KEY = "user";

export const saveAccessToken = async (token: string) => {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = async () => {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
};

export const removeAccessToken = async () => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const saveUser = async (user: User) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
};

export const removeUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
