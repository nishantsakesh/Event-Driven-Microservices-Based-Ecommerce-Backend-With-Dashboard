import axios from "axios";

const API = "http://localhost:8082/api/products";


export const getProducts = () => axios.get(API);
export const getProductById = (id) => axios.get(`${API}/${id}`);
export const addProduct = (product) => axios.post(API, product);
export const updateProduct = (id, product) => axios.put(`${API}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API}/${id}`);


const productService = {
    getAllProducts: getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};

export default productService;
