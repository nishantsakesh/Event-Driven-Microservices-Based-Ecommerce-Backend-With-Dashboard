import { Edit3, Trash2 } from "lucide-react";
import { AudioCard, AudioEmpty, AudioError, AudioLoader } from "../common";
import { formatCurrency, truncateText } from "../../utils";

function ProductList({ products, loading, error, onEdit, onDelete }) {
    if (loading) return <AudioLoader />;
    if (error) return <AudioError message="Products could not be loaded." />;
    if (products.length === 0) return <AudioEmpty message="No products added yet." />;

    return (
        <div className="grid gap-5">
            {products.map((product) => (
                <AudioCard key={product.id} className="rounded-3xl p-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div>
                            <p className="text-xs uppercase tracking-[6px] text-gray-500">
                                {product.brand || "AudioHub"} / {product.category}
                            </p>
                            <h3 className="mt-3 text-2xl font-black">{product.name}</h3>
                            <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-400">
                                {truncateText(product.description, 150) || "Premium audio product ready for curation."}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-300">
                                <span>{formatCurrency(product.price || 0)}</span>
                                <span className="text-gray-600">/</span>
                                <span>{product.quantity || 0} in stock</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => onEdit(product)}
                                aria-label={`Edit ${product.name}`}
                                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white transition hover:bg-white hover:text-black"
                            >
                                <Edit3 size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => onDelete(product.id)}
                                aria-label={`Delete ${product.name}`}
                                className="grid h-11 w-11 place-items-center rounded-full border border-red-400/20 text-red-300 transition hover:bg-red-400 hover:text-black"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                </AudioCard>
            ))}
        </div>
    );
}

export default ProductList;
