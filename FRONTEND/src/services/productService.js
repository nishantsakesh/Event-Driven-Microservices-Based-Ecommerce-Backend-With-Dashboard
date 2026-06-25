import { productApi } from "../api/axios";

export const getProducts = () => {
    return productApi.get("");
};

export const addProduct = (product) => {
    return productApi.post("", product);
};

export const deleteProduct = (id) => {
    return productApi.delete(`/${id}`);
};

export const updateProduct = (id, product) => {
    return productApi.put(`/${id}`, product);
};