import { useEffect, useState } from "react";
import productService from "../services/productService";

function useProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProducts = async () => {

        try {

            setLoading(true);
            setError(null);

            const response = await productService.getAllProducts();

            setProducts(response.data);

        } catch (err) {

            console.error(err);
            setError(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadProducts();

    }, []);

    return {

        products,
        loading,
        error,
        reload: loadProducts

    };

}

export default useProducts;