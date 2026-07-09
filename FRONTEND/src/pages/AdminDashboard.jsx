import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Package, ShieldCheck, Sparkles } from "lucide-react";
import ProductForm from "../components/admin/ProductForm";
import ProductList from "../components/admin/ProductList";
import { AudioButton, AudioContainer, AudioSection, AudioStats, AudioText } from "../components/common";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../services/productService";
import MainLayout from "../layouts/MainLayout"; // Imported your layout wrapper

const emptyProduct = {
    name: "",
    brand: "",
    category: "HEADPHONE",
    price: "",
    quantity: "",
    description: "",
    imageUrl: "",
};

function AdminDashboard() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(emptyProduct);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);
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

    const resetForm = () => {
        setProduct(emptyProduct);
        setEditingId(null);
    };

    const handleChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        try {
            if (editingId) await updateProduct(editingId, product);
            else await addProduct(product);
            resetForm();
            await loadProducts();
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        await deleteProduct(id);
        await loadProducts();
    };

    const handleEdit = (selectedProduct) => {
        setEditingId(selectedProduct.id);
        setProduct({
            name: selectedProduct.name || "",
            brand: selectedProduct.brand || "",
            category: selectedProduct.category || "HEADPHONE",
            price: selectedProduct.price || "",
            quantity: selectedProduct.quantity || "",
            description: selectedProduct.description || "",
            imageUrl: selectedProduct.imageUrl || "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <MainLayout>
            <main className="min-h-screen bg-black text-white">
                <AudioSection className="pt-12">
                    <AudioContainer>
                        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[10px] text-gray-500">Admin dashboard</p>
                                <h1 className="mt-6 text-5xl font-black leading-none md:text-7xl">AudioHub Control</h1>
                                <AudioText className="mt-6 max-w-2xl">
                                    Manage a curated catalogue where every product has a brand, a reason to exist, and a premium presentation.
                                </AudioText>
                                <p className="mt-4 text-sm text-gray-500">Signed in as {email}</p>
                            </div>

                            <AudioButton variant="secondary" onClick={handleLogout}>
                                <span className="inline-flex items-center gap-3">
                                    <LogOut size={18} />
                                    Logout
                                </span>
                            </AudioButton>
                        </div>

                        <div className="mb-12 grid gap-5 md:grid-cols-3">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                                <Package className="mb-6" />
                                <AudioStats value={products.length} label="Products" />
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                                <ShieldCheck className="mb-6" />
                                <AudioStats value="100%" label="Genuine focus" />
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                                <Sparkles className="mb-6" />
                                <AudioStats value="4" label="Budget tiers" />
                            </div>
                        </div>

                        <div className="grid gap-8 xl:grid-cols-[.9fr_1.1fr]">
                            <ProductForm
                                product={product}
                                editingId={editingId}
                                loading={saving}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                onCancel={resetForm}
                            />
                            <ProductList
                                products={products}
                                loading={loading}
                                error={error}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                    </AudioContainer>
                </AudioSection>
            </main>
        </MainLayout>
    );
}

export default AdminDashboard;
