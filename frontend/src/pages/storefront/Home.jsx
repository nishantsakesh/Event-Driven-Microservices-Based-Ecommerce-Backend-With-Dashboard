import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { CATEGORIES, getCategoryMeta } from '@/constants/categories';
import { toast } from 'sonner';
import { ShoppingCart, Sparkles, ArrowRight, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function Home() {
  const { data: products } = useProducts();
  const addItem = useCartStore((state) => state.addItem);
  const user = useAuthStore((state) => state.user);

  const featuredProducts = products?.slice(0, 5) || [];

  const handleAddToCart = (product) => {
    if (user?.role === 'ADMIN') {
      toast.error('Admin accounts cannot place customer orders');
      return;
    }
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <div className="min-h-screen bg-void text-[#8E8E93] w-full overflow-hidden font-sans">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-ref-teal/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-tube-amber/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-[#1F1F1F] text-ref-teal text-xs font-mono uppercase tracking-widest mb-10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Arrival: The Sonic Series</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-black tracking-tighter mb-6 leading-none text-white uppercase">
            Sound<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #FF9F0A, #00E5FF)' }}>
              Through Silence.
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#8E8E93] font-mono mb-12 max-w-xl leading-relaxed">
            Precision-engineered audio hardware for those who demand reference-grade fidelity.
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Link
              to="/products"
              className="group px-8 py-4 bg-tube-amber text-void font-black uppercase tracking-widest text-sm flex items-center gap-3 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,159,10,0.4)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#categories"
              className="px-8 py-4 border border-[#1F1F1F] text-[#8E8E93] font-mono text-sm uppercase tracking-widest hover:border-ref-teal/40 hover:text-ref-teal transition-all duration-500"
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
            >
              Browse Categories
            </a>
          </div>

          <div className="mt-16 flex flex-wrap justify-center items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-[#1F1F1F] text-[#8E8E93]">
              <ShieldCheck className="w-4 h-4 text-ref-teal" /> 2-Year Warranty
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-[#1F1F1F] text-[#8E8E93]">
              <Zap className="w-4 h-4 text-tube-amber" /> Express Shipping Worldwide
            </div>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1F1F1F]" />
      </section>

      {/* FEATURED BENTO GRID */}
      <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12 border-b border-[#1F1F1F] pb-8">
            <div>
              <p className="text-xs font-mono text-ref-teal uppercase tracking-widest mb-3">Featured Drops</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">The Vault.</h2>
            </div>
            <Link to="/products" className="group flex items-center gap-2 text-[#8E8E93] hover:text-tube-amber font-mono text-xs uppercase tracking-widest transition-colors">
              View All
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1F1F1F] auto-rows-[320px]">
            {featuredProducts.slice(0, 5).map((product, index) => {
              const isLarge = index === 0;
              const isWide = index === 4;
              return (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  className={`group relative overflow-hidden bg-[#0A0A0A] hover:bg-[#0F0F0F] transition-colors duration-500
                    ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                    ${isWide ? 'md:col-span-2' : ''}
                  `}
                >
                  <Link to={`/products/${product.id}`} className="absolute inset-0 z-0 flex items-center justify-center p-8">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }} />
                    ) : (
                      <div className="text-8xl font-black text-[#1F1F1F]">{product.name.charAt(0)}</div>
                    )}
                  </Link>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/20 to-transparent pointer-events-none z-10" />

                  {product.quantity > 0 && product.quantity < 10 && (
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2 py-1 bg-void border border-tube-amber/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-tube-amber animate-pulse" />
                      <span className="text-tube-amber text-[10px] font-mono uppercase tracking-widest">Limited: {product.quantity} left</span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 flex flex-col items-start gap-4 md:flex-row md:items-end justify-between z-20">
                    <div className="pr-4">
                      <p className="text-ref-teal font-mono text-xs uppercase tracking-widest mb-1">{product.brand}</p>
                      <h3 className={`font-black text-white leading-tight tracking-tight ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>{product.name}</h3>
                    </div>
                    <div className="flex items-center md:flex-col md:items-end gap-3 shrink-0 w-full md:w-auto justify-between md:justify-end">
                      <span className="font-mono text-white text-base md:text-xl font-bold">{formatPrice(product.price)}</span>
                      <button
                        onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                        className="p-3 bg-tube-amber text-void hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,159,10,0.3)]"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto border-t border-[#1F1F1F]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
        >
          <div className="mb-12">
            <p className="text-xs font-mono text-ref-teal uppercase tracking-widest mb-3">Browse by Category</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">The Archive.</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {CATEGORIES.slice(0, 8).map((category) => {
              const meta = getCategoryMeta(category.value);
              const Icon = meta?.icon;
              return (
                <motion.div key={category.value} variants={fadeInUp}>
                  <Link
                    to={`/products?category=${category.value}`}
                    className="group flex items-center gap-3 px-6 py-3 bg-[#0A0A0A] border border-[#1F1F1F] hover:border-ref-teal/40 hover:bg-[#0F0F0F] transition-all duration-500"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                  >
                    {Icon && <Icon className="w-4 h-4 text-[#8E8E93] group-hover:text-ref-teal transition-colors" />}
                    <span className="font-mono text-sm text-[#8E8E93] group-hover:text-white uppercase tracking-widest transition-colors">{category.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
