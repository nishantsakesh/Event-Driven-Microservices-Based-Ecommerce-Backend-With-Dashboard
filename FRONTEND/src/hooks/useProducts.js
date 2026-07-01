import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function useProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProducts = async () => {

        try {

            setLoading(true);

            const response = await getProducts();

            setProducts(response.data);

        } catch (err) {

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