import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, FilterX } from 'lucide-react';
import { useProducts } from '@/hooks';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice, cn } from '@/lib/utils';
import { CATEGORIES } from '@/constants/categories';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/authStore';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';
  
  const [searchInput, setSearchInput] = useState(initialSearch);
  const { data: products, isLoading } = useProducts();
  const addItem = useCartStore((state) => state.addItem);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (searchParams.get('search') !== searchInput && !searchInput) {
      setSearchInput(searchParams.get('search') || '');
    }
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== initialSearch) {
        const newParams = new URLSearchParams(searchParams);
        if (searchInput) {
          newParams.set('search', searchInput);
        } else {
          newParams.delete('search');
        }
        setSearchParams(newParams);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, initialSearch, searchParams, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput) {
      newParams.set('search', searchInput);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleCategoryClick = (val) => {
    const newParams = new URLSearchParams(searchParams);
    if (val === currentCategory) {
      newParams.delete('category');
    } else {
      newParams.set('category', val);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchInput('');
  };

  const handleAddToCart = (product) => {
    if (user?.role === 'ADMIN') {
      toast.error('Admin accounts cannot place customer orders');
      return;
    }
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const filteredProducts = products?.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(initialSearch.toLowerCase()) || 
                        p.brand.toLowerCase().includes(initialSearch.toLowerCase());
    const matchCategory = currentCategory ? p.category === currentCategory : true;
    return matchSearch && matchCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-void text-gray-300 pt-24 pb-20 px-4 md:px-8 selection:bg-ref-teal/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white uppercase leading-none">
              The <br/><span className="text-ref-teal">Collection</span>
            </h1>
            <p className="text-[#8E8E93] text-lg font-mono uppercase tracking-widest">
              Curated High-Fidelity Acoustics
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between border-b border-[#1F1F1F] pb-8">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative w-full lg:w-96">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search telemetry data..."
                className="w-full bg-[#0A0A0A] border-b border-[#1F1F1F] py-4 pl-12 pr-4 text-white placeholder:text-[#8E8E93] focus:outline-none focus:border-ref-teal transition-all font-mono text-sm"
              />
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E93]" />
            </form>

            {/* Categories */}
            <div className="w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
              <div className="flex gap-6 min-w-max">
                <button
                  onClick={() => handleCategoryClick('')}
                  className={cn(
                    "transition-colors whitespace-nowrap text-xs font-mono uppercase tracking-widest",
                    !currentCategory ? "text-tube-amber font-bold" : "text-[#8E8E93] hover:text-white"
                  )}
                >
                  All Architecture
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryClick(cat.value)}
                    className={cn(
                      "transition-colors whitespace-nowrap text-xs font-mono uppercase tracking-widest",
                      currentCategory === cat.value ? "text-tube-amber font-bold" : "text-[#8E8E93] hover:text-white"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col gap-24">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-12 animate-pulse">
                <div className="w-full md:w-1/2 aspect-video bg-[#0A0A0A] rounded-3xl border border-[#1F1F1F]"></div>
                <div className="w-full md:w-1/2 py-12 space-y-6 flex flex-col justify-center">
                  <div className="h-4 bg-[#1F1F1F] rounded w-1/4"></div>
                  <div className="h-16 bg-[#1F1F1F] rounded w-3/4"></div>
                  <div className="h-8 bg-[#1F1F1F] rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 flex flex-col items-center justify-center bg-[#0A0A0A] border border-[#1F1F1F] rounded-3xl">
            <FilterX className="w-16 h-16 text-[#1F1F1F] mb-6" />
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">No acoustics found</h3>
            <p className="text-[#8E8E93] font-mono text-sm mb-8">Adjust parameters to continue.</p>
            <button
              onClick={clearFilters}
              className="px-8 py-3 rounded-full bg-void border border-[#1F1F1F] text-ref-teal hover:border-ref-teal hover:bg-ref-teal/5 transition-all font-mono text-xs uppercase tracking-widest"
            >
              Clear Telemetry
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-16 md:gap-32">
            {filteredProducts.map((product, i) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                key={product.id}
                className="group flex flex-col md:flex-row gap-8 lg:gap-16 items-center"
              >
                {/* Image Block */}
                <Link to={`/products/${product.id}`} className="w-full md:w-1/2 relative aspect-video bg-[#0A0A0A] rounded-[2rem] border border-[#1F1F1F] p-8 overflow-hidden flex items-center justify-center hover:border-ref-teal/30 transition-colors duration-700">
                  <div className="absolute inset-0 bg-gradient-to-tr from-void to-transparent opacity-80 z-10 pointer-events-none"></div>
                  <div className="absolute top-8 left-8 z-20 px-3 py-1 bg-[#121212] border border-[#1F1F1F] text-[#8E8E93] text-xs font-mono uppercase tracking-widest rounded-md">
                    {product.brand}
                  </div>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-1000 ease-out" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }} />
                  ) : (
                    <div className="text-9xl font-black text-[#1F1F1F] relative z-10">{product.name.charAt(0)}</div>
                  )}
                </Link>
                
                {/* Info Block */}
                <div className="w-full md:w-1/2 flex flex-col justify-center py-6">
                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4 text-white hover:text-ref-teal transition-colors duration-500 leading-none uppercase">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-[#8E8E93] text-base leading-relaxed mb-8 line-clamp-3">
                    {product.description}
                  </p>
                  
                  {product.quantity > 0 && product.quantity < 10 && (
                    <div className="flex items-center gap-3 mb-6">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tube-amber opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-tube-amber"></span>
                      </span>
                      <span className="text-tube-amber text-xs font-mono uppercase tracking-widest">
                        Limited Allocation: {product.quantity} remaining
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8 mt-auto border-t border-[#1F1F1F] pt-6">
                    <span className="font-mono text-3xl font-black text-white">{formatPrice(product.price)}</span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      disabled={product.quantity === 0}
                      className="w-full sm:w-auto px-8 py-4 rounded-xl bg-tube-amber text-void font-bold uppercase tracking-widest text-sm hover:bg-tube-amber/90 disabled:opacity-50 transition-all flex items-center justify-center gap-3 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                    >
                      <ShoppingCart className="w-4 h-4" /> 
                      {product.quantity === 0 ? 'Depleted' : 'Acquire'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
