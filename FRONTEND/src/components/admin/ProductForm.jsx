import { PRODUCT_CATEGORIES } from "../../constants/productCategories";
import { AudioButton, AudioCard, AudioInput, AudioText } from "../common";

function ProductForm({ product, editingId, loading, onChange, onSubmit, onCancel }) {
    return (
        <AudioCard>
            <p className="text-sm uppercase tracking-[8px] text-gray-500">
                Catalogue control
            </p>
            <h2 className="mt-5 text-3xl font-black">
                {editingId ? "Refine product" : "Add product"}
            </h2>
            <AudioText className="mt-3">
                Present every item like a premium retail object, not a marketplace listing.
            </AudioText>

            <form onSubmit={onSubmit} className="mt-8 grid gap-5">
                <AudioInput name="name" placeholder="Product name" value={product.name} onChange={onChange} required />
                <AudioInput name="brand" placeholder="Brand" value={product.brand} onChange={onChange} required />

                <select
                    name="category"
                    value={product.category}
                    onChange={onChange}
                    className="w-full rounded-2xl border border-white/10 bg-[#151515] px-6 py-4 text-white outline-none focus:border-white"
                >
                    {PRODUCT_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <div className="grid gap-5 md:grid-cols-2">
                    <AudioInput type="number" name="price" placeholder="Price" value={product.price} onChange={onChange} required />
                    <AudioInput type="number" name="quantity" placeholder="Quantity" value={product.quantity} onChange={onChange} required />
                </div>

                <textarea
                    name="description"
                    placeholder="Short value proposition"
                    value={product.description}
                    onChange={onChange}
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-white"
                />

                <AudioInput name="imageUrl" placeholder="Image file name, optional" value={product.imageUrl} onChange={onChange} />

                <div className="flex flex-col gap-3 sm:flex-row">
                    <AudioButton type="submit" disabled={loading}>
                        {loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
                    </AudioButton>
                    {editingId && (
                        <AudioButton type="button" variant="secondary" onClick={onCancel}>
                            Cancel
                        </AudioButton>
                    )}
                </div>
            </form>
        </AudioCard>
    );
}

export default ProductForm;
