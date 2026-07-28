import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw, Minus, Plus, AlertCircle, Activity } from 'lucide-react';
import { useProduct, useProducts } from '@/hooks';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { getCategoryMeta } from '@/constants/categories';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';

// GSAP Imports
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const { data: allProducts } = useProducts();
  const addItem = useCartStore(state => state.addItem);
  const user = useAuthStore(state => state.user);
  
  const [quantity, setQuantity] = useState(1);
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const activeViewers = React.useMemo(() => Math.floor(Math.random() * (45 - 12 + 1) + 12), [product?.id]);
  
  useGSAP(() => {
    if (!product || isLoading) return;
    
    // 1. Pin the chart on the left while the right side scrolls
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: chartRef.current,
      pinSpacing: false,
    });

    // 2. Map scroll progress to the SVG Graph's stroke-dashoffset
    gsap.to('.frequency-line', {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5, // 1.5s inertial dampening delay
      }
    });

    // 3. Highlight text cards dynamically
    gsap.utils.toArray('.feature-card').forEach((card) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top center',
        end: 'bottom center',
        toggleClass: 'opacity-100 scale-105',
      });
    });
  }, { scope: containerRef, dependencies: [product, isLoading] });

  const relatedProducts = allProducts?.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#04151F] pt-24 px-4 pb-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 animate-pulse">
          <div className="w-full md:w-1/2 aspect-square bg-slate-800 rounded-3xl border border-slate-700"></div>
          <div className="w-full md:w-1/2 py-8 space-y-6">
            <div className="h-6 w-24 bg-slate-800 rounded"></div>
            <div className="h-12 w-3/4 bg-slate-800 rounded"></div>
            <div className="h-8 w-32 bg-slate-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-[#04151F] pt-24 px-4 pb-20 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="px-6 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700">
          Back to Drops
        </button>
      </div>
    );
  }

  const categoryMeta = getCategoryMeta(product.category);
  const CategoryIcon = categoryMeta?.icon;

  const handleAdd = () => {
    if (user?.role === 'ADMIN') {
      toast.error('Admin accounts cannot place orders');
      return;
    }
    addItem(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  // Features will now be dynamically fetched from product.features

  return (
    <div className="min-h-screen bg-void text-gray-300 w-full overflow-hidden font-sans selection:bg-ref-teal/30">
      
      {/* PHASE 1: The Editorial Hero */}
      <section className="pt-28 px-4 pb-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 relative group">
          <button onClick={() => navigate(-1)} className="absolute -top-12 left-0 flex items-center gap-2 text-ref-teal hover:text-tube-amber transition-colors font-bold uppercase tracking-widest text-sm z-20">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="aspect-square bg-[#0A0A0A] rounded-3xl border border-[#1F1F1F] flex items-center justify-center p-12 relative overflow-hidden group-hover:border-ref-teal/30 transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}>
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl relative z-10 scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }} />
            ) : (
              <div className="text-9xl font-black text-[#1F1F1F] relative z-10">{product.name.charAt(0)}</div>
            )}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-ref-teal/5 blur-[120px] rounded-full"></div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center z-10">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-[#0A0A0A] border border-[#1F1F1F] text-white font-bold text-xs uppercase tracking-widest">
              {product.brand}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-ref-teal/10 border border-ref-teal/20 text-ref-teal font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              {CategoryIcon && <CategoryIcon className="w-3.5 h-3.5" />} {categoryMeta?.label || product.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight text-white tracking-tighter uppercase">{product.name}</h1>
          
          <div className="flex flex-col gap-1 mb-8">
            <span className="text-xs font-mono text-tube-amber uppercase tracking-widest flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tube-amber opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tube-amber"></span>
              </span>
              {activeViewers} audiophiles analyzing this
            </span>
            <div className="text-3xl font-mono text-ref-teal">{formatPrice(product.price)}</div>
          </div>
          <p className="text-[#8E8E93] text-lg leading-relaxed mb-8 max-w-xl">{product.description}</p>
          
          {/* Highlights Mini-Badges */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {product.highlights.map((highlight, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#121212] border border-[#1F1F1F] text-[#8E8E93] text-xs font-mono uppercase tracking-wider rounded-md">
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {product.quantity > 0 && product.quantity < 10 && (
            <div className="mb-4 px-4 py-3 bg-[#121212] border border-[#1F1F1F] rounded-xl flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-tube-amber" />
              <span className="text-xs font-mono text-tube-amber uppercase tracking-widest">
                Vault Status: Only {product.quantity} units remain
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-8">
            <div className="flex items-center justify-between sm:justify-start gap-4 bg-[#0A0A0A] rounded-2xl p-2 border border-[#1F1F1F]">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-[#121212] rounded-xl transition-colors text-white"><Minus className="w-5 h-5" /></button>
              <span className="w-8 text-center font-mono text-xl text-white">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))} className="p-3 hover:bg-[#121212] rounded-xl transition-colors text-white"><Plus className="w-5 h-5" /></button>
            </div>
            
            <button onClick={handleAdd} disabled={product.quantity === 0} className="flex-1 py-5 rounded-2xl font-black text-lg bg-tube-amber text-void flex items-center justify-center gap-3 transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,159,10,0.4)] uppercase tracking-wider shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none animate-[pulse_4s_ease-in-out_infinite]" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}>
              <ShoppingCart className="w-5 h-5" /> {product.quantity === 0 ? 'Depleted' : 'Acquire'}
            </button>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-mono text-[#8E8E93]">
            <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-ref-teal" /> 2-Year Auth. Warranty</span>
            <span className="flex items-center gap-2"><Truck className="w-5 h-5 text-tube-amber" /> Express Dispatch</span>
          </div>
        </div>
      </section>

      {/* PHASE 2: The Tactile Shift (Sensory Visualizer) */}
      {product.features && product.features.length > 0 && (
        <section ref={containerRef} className="relative flex flex-col md:flex-row w-full bg-[#050505] border-y border-[#1F1F1F]">
          
          {/* LEFT: Pinned Dynamic Visualizer */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center p-8">
            <div ref={chartRef} className="w-full max-w-lg aspect-square relative will-change-transform flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-ref-teal/5 rounded-full blur-[100px]"></div>
              <Activity className="w-12 h-12 text-ref-teal mb-8 opacity-50" />
              <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(0,229,255,0.4)] relative z-10">
                <path d="M0,100 L400,100" stroke="#1F1F1F" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M100,0 L100,200 M200,0 L200,200 M300,0 L300,200" stroke="#1F1F1F" strokeWidth="1" strokeDasharray="2 6" className="opacity-30" />
                <path 
                  className="frequency-line"
                  d="M0,150 Q100,150 150,100 T300,80 T400,50" 
                  fill="none" 
                  stroke="var(--color-ref-teal)" 
                  strokeWidth="4"
                  strokeLinecap="square"
                  strokeDasharray="1000"
                  strokeDashoffset="1000" 
                  style={{ willChange: 'stroke-dashoffset' }}
                />
              </svg>
              <p className="mt-8 font-mono text-[#8E8E93] uppercase tracking-widest text-xs">Acoustic Mapping / Telemetry</p>
            </div>
          </div>

          {/* RIGHT: Scrolling Feature Cards */}
          <div className="w-full md:w-1/2 flex flex-col py-[30vh] px-8 lg:px-24 gap-[30vh] relative z-20">
            {product.features.map((feat, idx) => (
              <div key={idx} className="feature-card opacity-30 transform transition-all duration-1000 ease-out will-change-transform" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}>
                <div className="inline-block px-3 py-1 bg-[#121212] text-tube-amber text-xs font-mono uppercase tracking-widest rounded-md mb-6 border border-[#1F1F1F]">Engineering Architecture</div>
                <h3 className="text-3xl lg:text-4xl font-black mb-6 tracking-tighter text-white leading-tight">{feat}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PHASE 2.5: DNA Block & Box Contents */}
      <section className="py-32 px-4 max-w-7xl mx-auto border-b border-[#1F1F1F]">
        <div className="flex flex-col md:flex-row gap-16">
          {/* DNA Block (Specs) */}
          <div className="w-full md:w-2/3">
            <h2 className="text-sm font-mono text-ref-teal tracking-widest uppercase mb-8">Technical DNA</h2>
            {product.specifications && Object.keys(product.specifications).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <div key={idx} className="bg-[#0A0A0A] border border-[#1F1F1F] p-6 hover:border-ref-teal/30 transition-colors group">
                    <p className="text-[#8E8E93] font-mono text-xs uppercase tracking-wider mb-3 group-hover:text-tube-amber transition-colors">{key}</p>
                    <p className="text-xl font-mono text-white leading-tight">{value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#8E8E93] font-mono">No telemetry data available.</p>
            )}
          </div>

          {/* What's In The Box */}
          <div className="w-full md:w-1/3">
            <h2 className="text-sm font-mono text-ref-teal tracking-widest uppercase mb-8">Included Components</h2>
            {product.whatsInTheBox && product.whatsInTheBox.length > 0 ? (
              <ul className="space-y-4">
                {product.whatsInTheBox.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 border-b border-[#1F1F1F] pb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-tube-amber mt-2"></div>
                    <span className="text-lg text-[#FAFAFA] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#8E8E93] font-mono">Standard packaging.</p>
            )}
          </div>
        </div>
      </section>

      {/* PHASE 3: Signal Chain Indicator */}
      {relatedProducts.length > 0 && (
        <section className="py-32 px-4 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-sm font-mono text-tube-amber tracking-widest uppercase mb-4">Ecosystem Extension</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-4">Signal Path</h3>
            <p className="text-[#8E8E93] max-w-xl">Complete your chain with components designed to synergize perfectly with the {product.name}.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="group relative overflow-hidden bg-[#0A0A0A] border border-[#1F1F1F] hover:border-ref-teal/50 transition-all block" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)', transitionDuration: '500ms' }}>
                <div className="aspect-square p-8 relative flex items-center justify-center">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-700 relative z-10" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }} />
                  ) : (
                    <div className="text-6xl font-black text-[#1F1F1F]">{p.name.charAt(0)}</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-20"></div>
                </div>
                <div className="p-6 relative z-30 -mt-8 bg-[#0A0A0A]">
                  <p className="text-ref-teal font-mono text-xs uppercase tracking-widest mb-1">{p.brand}</p>
                  <h3 className="font-bold text-white text-lg line-clamp-1 mb-2 tracking-tight">{p.name}</h3>
                  <div className="font-mono text-sm text-[#8E8E93]">{formatPrice(p.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
