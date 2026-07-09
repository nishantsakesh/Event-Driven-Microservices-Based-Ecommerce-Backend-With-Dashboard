import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/productService";

const initialProduct = {
    name: "",
    brand: "",
    category: "HEADPHONE",
    price: "",
    quantity: "",
    description: "",
    imageUrl: ""
};

function Products() {
    const [product, setProduct] = useState(initialProduct);
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            const response = await getProducts(); // Standardized service call
            setProducts(response.data);
        } catch (error) {
            console.error(error);
            setMessage("Failed to load products.");
        }
    }

    function handleChange(event) {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if (editingId === null) {
                await addProduct(product); // Standardized service call
                setMessage("Product Added Successfully.");
            } else {
                await updateProduct(editingId, product); // Standardized service call
                setMessage("Product Updated Successfully.");
                setEditingId(null);
            }
            setProduct(initialProduct);
            await loadProducts();
        } catch (error) {
            console.error(error);
            setMessage("Operation Failed.");
        }
    }

    function handleEdit(item) {
        setEditingId(item.id);
        setProduct({
            name: item.name,
            brand: item.brand,
            category: item.category,
            price: item.price,
            quantity: item.quantity,
            description: item.description || "",
            imageUrl: item.imageUrl || ""
        });
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete Product?")) return;
        try {
            await deleteProduct(id); // Standardized service call
            setMessage("Product Deleted.");
            await loadProducts();
        } catch (error) {
            console.error(error);
            setMessage("Delete Failed.");
        }
    }

    return (
        <MainLayout>
            <h1>Product Testing Page</h1>
            <p>{message}</p>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    value={product.name}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    name="brand"
                    placeholder="Brand"
                    value={product.brand}
                    onChange={handleChange}
                />
                <br /><br />

                <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                >
                    <option>HEADPHONE</option>
                    <option>EARPHONE</option>
                    <option>EARBUDS</option>
                    <option>SPEAKER</option>
                    <option>SOUNDBAR</option>
                    <option>HEADSET</option>
                </select>
                <br /><br />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={handleChange}
                />
                <br /><br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    name="imageUrl"
                    placeholder="Image URL"
                    value={product.imageUrl}
                    onChange={handleChange}
                />
                <br /><br />

                <button type="submit">
                    {editingId === null ? "Add Product" : "Update Product"}
                </button>
            </form>

            <hr />
            <h2>Products</h2>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </MainLayout>
    );
}

export default Products;
