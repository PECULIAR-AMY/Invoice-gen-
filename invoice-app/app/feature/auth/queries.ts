import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser, logoutUser } from "./api";
import { LoginInput, SignupInput } from "./types";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginInput) => loginUser(data),
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: (data: SignupInput) => signupUser(data),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logoutUser,
  });
}
