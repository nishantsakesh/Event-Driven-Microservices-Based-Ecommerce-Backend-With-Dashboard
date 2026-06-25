import { useEffect, useState } from "react";
import {
    addProduct,
    deleteProduct,
    getProducts,
    updateProduct
} from "../services/productService";

function AdminDashboard() {

    const email = localStorage.getItem("email");

    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        category: "HEADPHONE",
        price: "",
        quantity: "",
        description: "",
        imageUrl: ""
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        const response = await getProducts();
        setProducts(response.data);

    };

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId === null) {

                await addProduct(product);
                alert("Product Added Successfully");

            } else {

                await updateProduct(editingId, product);
                alert("Product Updated Successfully");

                setEditingId(null);
            }

            setProduct({
                name: "",
                brand: "",
                category: "HEADPHONE",
                price: "",
                quantity: "",
                description: "",
                imageUrl: ""
            });

            loadProducts();

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

        if (window.confirm("Delete this product?")) {

            await deleteProduct(id);

            loadProducts();
        }

    };

    const handleEdit = (product) => {

        setEditingId(product.id);

        setProduct({
            name: product.name,
            brand: product.brand,
            category: product.category,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            imageUrl: product.imageUrl
        });

    };

    return (

        <div style={{ padding: "20px" }}>

            <h1>Admin Dashboard</h1>

            <h3>Welcome, {email}</h3>

            <hr />

            <h2>
                {editingId ? "Update Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    placeholder="Brand"
                    name="brand"
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
                    placeholder="Price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    placeholder="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    placeholder="Image Name (sony.jpg)"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    {editingId ? "Update Product" : "Add Product"}
                </button>

            </form>

            <hr />

            <h2>Products</h2>

            {

                products.map(product => (

                    <div
                        key={product.id}
                        style={{
                            border: "1px solid black",
                            padding: "15px",
                            marginBottom: "15px"
                        }}
                    >

                        <h3>{product.name}</h3>

                        <p><b>Brand:</b> {product.brand}</p>

                        <p><b>Category:</b> {product.category}</p>

                        <p><b>Price:</b> ₹{product.price}</p>

                        <p><b>Quantity:</b> {product.quantity}</p>

                        <p><b>Description:</b> {product.description}</p>

                        <p><b>Image:</b> {product.imageUrl}</p>

                        <button
                            onClick={() => handleEdit(product)}
                        >
                            Update
                        </button>

                        {"  "}

                        <button
                            onClick={() => handleDelete(product.id)}
                        >
                            Delete
                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default AdminDashboard;