import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "@/types/auth";
import {
  getAccessToken,
  getUser,
  removeAccessToken,
  removeUser,
  saveAccessToken,
  saveUser,
} from "@/services/authStorage";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    setIsLoading(true);
    try {
      const storedToken = await getAccessToken();
      const storedUser = await getUser();

      if (storedToken && storedUser) {
        setUser(storedUser);
        setToken(storedToken);
      }
    } catch (error) {
      console.log("RESTORE SESSION ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string, user: User) => {
    await saveAccessToken(token);
    await saveUser(user);
    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    await removeAccessToken();
    await removeUser();
    setToken(null);
    setUser(null);

    router.replace("/welcome");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated: !!login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
