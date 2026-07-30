import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { CATEGORIES, getCategoryMeta } from '@/constants/categories';
import { toast } from 'sonner';
import { ShoppingCart, Sparkles, ArrowRight, ShieldCheck, Zap, ArrowUpRight, BadgeCheck, Activity, Waves, AudioLines } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import heroVideo from '../../assets/video/marshal.mp4';

export default function Home() {
  const { data: products } = useProducts();
  const addItem = useCartStore((state) => state.addItem);
  const user = useAuthStore((state) => state.user);

  const featuredProducts = products?.slice(0, 10) || [];

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
    <div className="min-h-screen bg-premium-void text-premium-cement w-full overflow-hidden font-sans">
      
      {/* HERO */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center overflow-hidden">
        
        {/* Background Video Layer */}
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <video 
            src={heroVideo} 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              transform: 'scale(1.15)',
              mixBlendMode: 'screen', 
              pointerEvents: 'none' 
            }}
          />
          {/* Ambient Dim Layer */}
          <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(18,18,20,0.7), rgba(18,18,20,0.85))' }}></div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 flex flex-col items-center max-w-[1400px] w-full"
        >
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tighter mb-6 leading-none text-white uppercase drop-shadow-lg">
            Sound<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #E5C697, #C48A45)' }}>
              Through Silence.
            </span>
          </h1>

          <p className="text-base md:text-[1.125rem] text-gray-300 font-mono max-w-[540px] mx-auto mb-8 leading-relaxed drop-shadow-md">
            Precision-engineered audio hardware for those who demand reference-grade fidelity.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link
              to="/products"
              className="group px-6 py-3 bg-premium-gold text-premium-void font-black uppercase tracking-widest text-sm flex items-center gap-3 transition-all duration-500 hover:scale-[1.03] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] rounded-[var(--input-radius)]"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#categories"
              className="px-6 py-3 border border-premium-slate/20 text-premium-cement font-mono text-sm uppercase tracking-widest hover:border-premium-wheat/30 hover:text-premium-wheat transition-all duration-500 rounded-[var(--input-radius)]"
            >
              Browse Categories
            </a>
          </div>
        </motion.div>
      </section>

      {/* TRUST BADGES RIBBON */}
      <section className="border-y border-premium-slate/15 bg-premium-void">
        <div className="max-w-[1400px] mx-auto px-4 py-6 md:py-8 overflow-hidden">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-xs md:text-sm font-mono text-[#8E8E93] uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-5 h-5 text-[#71717a]" />
              <span>Hi-Res Audio Certified</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-[#1F1F1F]"></div>
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#71717a]" />
              <span>Linear Frequency Response</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-[#1F1F1F]"></div>
            <div className="flex items-center gap-3">
              <Waves className="w-5 h-5 text-[#71717a]" />
              <span>Active Noise Cancellation</span>
            </div>
            <div className="hidden lg:block w-px h-8 bg-[#1F1F1F]"></div>
            <div className="hidden lg:flex items-center gap-3">
              <AudioLines className="w-5 h-5 text-[#71717a]" />
              <span>Low-Latency Wireless</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          <div className="mb-12">
            <p className="text-xs font-mono text-ref-teal uppercase tracking-widest mb-3">Audio Architecture</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">The Lineup.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
            {/* Headphones - Large */}
            <Link to="/products?category=HEADPHONE" className="group lg:col-span-2 relative bg-premium-surface border border-premium-slate/15 hover:border-premium-wheat/10 overflow-hidden transition-colors duration-500 h-[400px] lg:h-full flex items-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/50 to-transparent z-10" />
              <div className="absolute inset-0 w-full h-full flex justify-center items-center opacity-40 group-hover:scale-105 transition-transform duration-700 z-0">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop" alt="Headphones" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-20">
                <p className="text-[#a1a1aa] text-xs font-mono uppercase tracking-widest mb-2">Immersive Soundstage</p>
                <h3 className="text-3xl font-black text-white uppercase">Headphones</h3>
              </div>
            </Link>

            {/* Earbuds - Stacked */}
            <div className="flex flex-col gap-6 lg:h-full">
              <Link to="/products?category=EARPHONE" className="group flex-1 relative bg-premium-surface border border-premium-slate/15 hover:border-premium-wheat/10 overflow-hidden transition-colors duration-500 h-[250px] lg:h-auto flex items-end p-8">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/50 to-transparent z-10" />
                <div className="absolute inset-0 w-full h-full flex justify-end items-center opacity-40 group-hover:scale-105 transition-transform duration-700 z-0">
                  <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop" alt="Earbuds" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-20">
                  <p className="text-[#a1a1aa] text-xs font-mono uppercase tracking-widest mb-2">True Wireless</p>
                  <h3 className="text-2xl font-black text-white uppercase">Earbuds</h3>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SWIPER PRODUCT CAROUSEL */}
      <section className="py-24 px-4 md:px-8 bg-premium-void border-t border-premium-slate/15">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-mono text-tube-amber uppercase tracking-widest mb-3">Featured Drops</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">The Vault.</h2>
            </div>
            <Link to="/products" className="group flex items-center gap-2 text-[#8E8E93] hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
              View All Vault Releases
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="relative group">
            {featuredProducts.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="pb-12"
              >
                {featuredProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="group/card relative bg-premium-charcoal border border-premium-slate/15 h-[450px] overflow-hidden flex flex-col justify-between p-6 hover:border-premium-wheat/20 transition-colors duration-500">
                      
                      <div className="absolute top-4 left-4 z-20">
                        {product.quantity > 0 && product.quantity < 10 && (
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-void border border-tube-amber/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-tube-amber animate-pulse" />
                            <span className="text-tube-amber text-[10px] font-mono uppercase tracking-widest">Limited: {product.quantity}</span>
                          </div>
                        )}
                      </div>

                      <Link to={`/products/${product.id}`} className="relative h-[250px] w-full flex items-center justify-center mb-6">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain drop-shadow-xl group-hover/card:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="text-6xl font-black text-[#1F1F1F]">{product.name.charAt(0)}</div>
                        )}
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-premium-void/80 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                          <button 
                            onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                            className="bg-premium-gold text-premium-void px-6 py-3 font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                          </button>
                        </div>
                      </Link>

                      <div className="flex flex-col gap-2 z-20">
                        <p className="text-[#8E8E93] font-mono text-xs uppercase tracking-widest">{product.brand}</p>
                        <Link to={`/products/${product.id}`} className="hover:text-ref-teal transition-colors">
                          <h3 className="font-bold text-white text-lg line-clamp-2">{product.name}</h3>
                        </Link>
                        <span className="font-mono text-white text-xl font-bold mt-2">{formatPrice(product.price)}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="h-[400px] flex items-center justify-center border border-[#1F1F1F] border-dashed text-neutral-500">
                Loading Vault...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto border-t border-premium-slate/15">
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
                    className="group flex items-center gap-3 px-6 py-3 bg-premium-charcoal border border-premium-slate/15 hover:border-premium-wheat/20 transition-all duration-500"
                  >
                    {Icon && <Icon className="w-4 h-4 text-premium-cement group-hover:text-premium-wheat transition-colors" />}
                    <span className="font-mono text-sm text-premium-cement group-hover:text-white uppercase tracking-widest transition-colors">{category.label}</span>
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
