import React, { useState } from 'react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks';
import { formatPrice, cn, truncate } from '@/lib/utils';
import { CATEGORIES } from '@/constants/categories';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [features, setFeatures] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [whatsInTheBox, setWhatsInTheBox] = useState([]);

  const { data: products = [], isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRow = (id) => {
    setExpandedProductId(prev => prev === id ? null : id);
  };

  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setFeatures(product?.features || []);
    setHighlights(product?.highlights || []);
    setWhatsInTheBox(product?.whatsInTheBox || []);
    setSpecs(
      Array.isArray(product?.technicalSpecifications)
        ? product.technicalSpecifications.map(s => {
            if (s.key !== undefined && s.value !== undefined) return { key: String(s.key), value: String(s.value) };
            const entry = Object.entries(s)[0];
            return entry ? { key: String(entry[0]), value: String(entry[1]) } : { key: '', value: '' };
          })
        : (product?.specifications 
            ? Object.entries(product.specifications).map(([key, value]) => ({ key: String(key), value: String(value) }))
            : [])
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedProduct(null);
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
      name: formData.get('name'),
      brand: formData.get('brand'),
      category: formData.get('category'),
      price: parseFloat(formData.get('price')),
      quantity: parseInt(formData.get('quantity') || formData.get('stockQuantity') || '0', 10),
      description: formData.get('description'),
      imageUrl: formData.get('imageUrl') || '',
      features: features.filter(f => f.trim() !== ''),
      highlights: highlights.filter(h => h.trim() !== ''),
      whatsInTheBox: whatsInTheBox.filter(w => w.trim() !== ''),
      technicalSpecifications: specs.filter(s => s.key.trim() && s.value.trim())
    };

    try {
      if (selectedProduct) {
        await updateProduct.mutateAsync({ id: selectedProduct.id, data: productData, ...productData });
        toast.success('Product updated successfully');
      } else {
        await createProduct.mutateAsync(productData);
        toast.success('Product created successfully');
      }
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Operation failed');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct.mutateAsync(selectedProduct.id);
      toast.success('Product deleted successfully');
      handleCloseDeleteModal();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-premium-gold text-premium-void font-bold tracking-widest uppercase text-xs rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 sm:px-6 py-3 w-10"></th>
                <th className="px-4 sm:px-6 py-3">Product</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Brand</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Category</th>
                <th className="px-4 sm:px-6 py-3">Price</th>
                <th className="px-4 sm:px-6 py-3">Qty</th>
                <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="7" className="text-center py-8">Loading products...</td></tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <React.Fragment key={product.id}>
                    <tr 
                      onClick={() => toggleRow(product.id)}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <button className="p-1 text-gray-500 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                          {expandedProductId === product.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <span className="font-medium text-gray-900 dark:text-white" title={product.name}>
                            {truncate(product.name, 30)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{product.brand}</td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "font-medium",
                          (product.quantity || product.stockQuantity || 0) < 10 ? "text-red-500" : "text-gray-900 dark:text-white"
                        )}>
                          {product.quantity ?? product.stockQuantity ?? 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleOpenModal(product); }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleOpenDeleteModal(product); }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedProductId === product.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50/50 dark:bg-gray-800/50 border-b dark:border-gray-700"
                        >
                          <td colSpan="7" className="px-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pl-4 sm:pl-10">
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Brand & Category</span>
                                <span className="font-medium text-gray-900 dark:text-white">{product.brand} • {product.category}</span>
                              </div>
                              <div className="sm:col-span-2">
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Description</span>
                                <span className="text-gray-900 dark:text-white text-xs block">{product.description || 'No description available.'}</span>
                              </div>
                              {product.features?.length > 0 && (
                                <div className="sm:col-span-2">
                                  <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Features</span>
                                  <ul className="list-disc pl-4 text-gray-900 dark:text-white text-xs">
                                    {product.features.slice(0,3).map((f, i) => <li key={i}>{f}</li>)}
                                    {product.features.length > 3 && <li>+{product.features.length - 3} more...</li>}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="admin-modal-card relative"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input name="name" defaultValue={selectedProduct?.name} required className="w-full px-3 py-2 rounded-lg bg-premium-charcoal border border-premium-slate/15 text-premium-cement placeholder:text-premium-cement/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
                    <input name="brand" defaultValue={selectedProduct?.brand} required className="w-full px-3 py-2 rounded-lg bg-premium-charcoal border border-premium-slate/15 text-premium-cement placeholder:text-premium-cement/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select 
                      name="category" 
                      defaultValue={selectedProduct?.category || ''} 
                      required 
                      className="w-full px-3 py-2 rounded-lg bg-premium-charcoal border border-premium-slate/15 text-premium-cement placeholder:text-premium-cement/50 outline-none"
                    >
                      <option value="" disabled className="bg-white dark:bg-gray-800 text-gray-500">Select Category</option>
                      {CATEGORIES.map(c => (
                        <option key={c.value} value={c.value} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                          {c.label} ({c.value})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                    <input type="number" step="0.01" min="0.01" name="price" defaultValue={selectedProduct?.price} required className="w-full px-3 py-2 rounded-lg bg-premium-charcoal border border-premium-slate/15 text-premium-cement placeholder:text-premium-cement/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Quantity</label>
                    <input type="number" min="1" name="quantity" defaultValue={selectedProduct?.quantity ?? selectedProduct?.stockQuantity ?? 10} required className="w-full px-3 py-2 rounded-lg bg-premium-charcoal border border-premium-slate/15 text-premium-cement placeholder:text-premium-cement/50 outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                    <input name="imageUrl" defaultValue={selectedProduct?.imageUrl} className="w-full px-3 py-2 rounded-lg bg-premium-charcoal border border-premium-slate/15 text-premium-cement placeholder:text-premium-cement/50 outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea name="description" defaultValue={selectedProduct?.description} rows="3" required className="w-full px-3 py-2 rounded-lg bg-premium-charcoal border border-premium-slate/15 text-premium-cement placeholder:text-premium-cement/50 outline-none"></textarea>
                  </div>
                  
                  {/* Dynamic Features */}
                  <div className="col-span-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Features</label>
                      <button type="button" onClick={() => setFeatures(prev => [...prev, ''])} className="text-xs text-premium-gold hover:text-premium-wheat flex items-center gap-1 font-semibold"><Plus className="w-3 h-3"/> Add Feature</button>
                    </div>
                    <div className="space-y-2">
                      {features.map((feat, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input value={feat} onChange={e => {
                            const newF = [...features];
                            newF[idx] = e.target.value;
                            setFeatures(newF);
                          }} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Open-back design" />
                          <button type="button" onClick={() => setFeatures(features.filter((_, i) => i !== idx))} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                        </div>
                      ))}
                      {features.length === 0 && <p className="text-sm text-gray-400 italic">No features added.</p>}
                    </div>
                  </div>

                  {/* Dynamic Highlights */}
                  <div className="col-span-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Highlights</label>
                      <button type="button" onClick={() => setHighlights(prev => [...prev, ''])} className="text-xs text-premium-gold hover:text-premium-wheat flex items-center gap-1 font-semibold"><Plus className="w-3 h-3"/> Add Highlight</button>
                    </div>
                    <div className="space-y-2">
                      {highlights.map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input value={item} onChange={e => {
                            const newH = [...highlights];
                            newH[idx] = e.target.value;
                            setHighlights(newH);
                          }} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Award-winning planar magnetic drivers" />
                          <button type="button" onClick={() => setHighlights(highlights.filter((_, i) => i !== idx))} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                        </div>
                      ))}
                      {highlights.length === 0 && <p className="text-sm text-gray-400 italic">No highlights added.</p>}
                    </div>
                  </div>

                  {/* Dynamic What's In The Box */}
                  <div className="col-span-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">What's In The Box</label>
                      <button type="button" onClick={() => setWhatsInTheBox(prev => [...prev, ''])} className="text-xs text-premium-gold hover:text-premium-wheat flex items-center gap-1 font-semibold"><Plus className="w-3 h-3"/> Add Item</button>
                    </div>
                    <div className="space-y-2">
                      {whatsInTheBox.map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input value={item} onChange={e => {
                            const newW = [...whatsInTheBox];
                            newW[idx] = e.target.value;
                            setWhatsInTheBox(newW);
                          }} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 6.35mm unbalanced cable" />
                          <button type="button" onClick={() => setWhatsInTheBox(whatsInTheBox.filter((_, i) => i !== idx))} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                        </div>
                      ))}
                      {whatsInTheBox.length === 0 && <p className="text-sm text-gray-400 italic">No box items added.</p>}
                    </div>
                  </div>

                  {/* Dynamic Specs */}
                  <div className="col-span-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Technical Specifications</label>
                      <button type="button" onClick={() => setSpecs(prev => [...prev, {key:'', value:''}])} className="text-xs text-premium-gold hover:text-premium-wheat flex items-center gap-1 font-semibold"><Plus className="w-3 h-3"/> Add Spec</button>
                    </div>
                    <div className="space-y-2">
                      {specs.map((spec, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input value={spec.key} onChange={e => {
                            const newS = [...specs];
                            newS[idx].key = e.target.value;
                            setSpecs(newS);
                          }} className="w-1/3 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="Key (e.g. Impedance)" />
                          <input value={spec.value} onChange={e => {
                            const newS = [...specs];
                            newS[idx].value = e.target.value;
                            setSpecs(newS);
                          }} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="Value (e.g. 300 Ohms)" />
                          <button type="button" onClick={() => setSpecs(specs.filter((_, i) => i !== idx))} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                        </div>
                      ))}
                      {specs.length === 0 && <p className="text-sm text-gray-400 italic">No specifications added.</p>}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-medium text-premium-cement bg-premium-charcoal hover:bg-premium-charcoal/80 border border-premium-slate/20 rounded-lg">Cancel</button>
                  <button type="submit" disabled={createProduct.isPending || updateProduct.isPending} className="px-4 py-2 text-sm font-medium text-premium-void bg-premium-gold hover:opacity-90 rounded-lg disabled:opacity-50 tracking-widest uppercase">
                    {createProduct.isPending || updateProduct.isPending ? 'Saving...' : 'Save Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete Product</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button onClick={handleCloseDeleteModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 w-full">Cancel</button>
                <button onClick={handleDelete} disabled={deleteProduct.isPending} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg w-full disabled:opacity-50">
                  {deleteProduct.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
