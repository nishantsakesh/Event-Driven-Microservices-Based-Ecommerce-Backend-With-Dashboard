import { productApi } from "../api/axios";

export const getProducts = () => {
  return productApi.get("/");
};