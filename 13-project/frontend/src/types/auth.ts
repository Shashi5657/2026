export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: User;
}
