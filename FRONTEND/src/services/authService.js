import { authApi } from "../api/axios";

export const registerUser = (data) => {
  return authApi.post("/register", data);
};

export const loginUser = (data) => {
  return authApi.post("/login", data);
};