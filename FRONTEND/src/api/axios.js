import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:8081/api/auth",
});

export const productApi = axios.create({
  baseURL: "http://localhost:8082/api/products",
});