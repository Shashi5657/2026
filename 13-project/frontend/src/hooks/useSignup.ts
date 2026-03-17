import { useMutation } from "@tanstack/react-query";

import { signupApi } from "@/api/authApi";

export const useSignup = () => {
  return useMutation({
    mutationFn: signupApi,
  });
};
