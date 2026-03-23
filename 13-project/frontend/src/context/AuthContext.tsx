import { AuthState } from "@/types/auth";
import { createContext, useContext } from "react";

export interface AuthContextType extends AuthState {
  login: (token: string, user: any) => Promise<void>;

  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
