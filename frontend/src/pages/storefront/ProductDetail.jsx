import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useProduct } from '@/hooks';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const addItem = useCartStore(state => state.addItem);
  const user = useAuthStore(state => state.user);

  const handleAdd = () => {
    if (user?.role === 'ADMIN') {
      toast.error('Admin accounts cannot place orders');
      return;
    }
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  if (isLoading) {
    return (
      <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '6rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', display: 'flex', gap: '4rem' }}>
          <div style={{ flex: 1, backgroundColor: 'var(--bg-surface)', height: '500px', borderRadius: '8px', animation: 'pulse 2s infinite' }}></div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ height: '3rem', backgroundColor: 'var(--bg-surface)', borderRadius: '4px', animation: 'pulse 2s infinite' }}></div>
            <div style={{ height: '2rem', backgroundColor: 'var(--bg-surface)', borderRadius: '4px', width: '50%', animation: 'pulse 2s infinite' }}></div>
            <div style={{ height: '10rem', backgroundColor: 'var(--bg-surface)', borderRadius: '4px', animation: 'pulse 2s infinite' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center text-center" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
        <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-3xl font-bold text-[var(--text-main)] mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="px-6 py-3 rounded-full" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)' }}>
          Back to Store
        </button>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price || 0);

  return (
    <div className="pdp-wrapper" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-main)', minHeight: '100vh', paddingTop: '4rem' }}>
      
      {/* 1. HERO SECTION */}
      <div className="pdp-container relative" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
        <button onClick={() => navigate(-1)} className="absolute top-4 left-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Left Visual Column */}
        <div className="pdp-image-wrapper" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid #27272a', borderRadius: '8px', padding: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '500px' }}>
          <img src={product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop'} alt={product.name} style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain', maxHeight: '400px' }} />
        </div>

        {/* Right Information Column */}
        <div className="pdp-info-stack" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', backgroundColor: '#27272a', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.brand}</span>
            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', backgroundColor: '#27272a', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.category}</span>
          </div>
          
          <h1 style={{ fontSize: '2.25rem', fontWeight: '700', letterSpacing: '-0.01em', lineHeight: '1.2', margin: 0 }}>{product.name}</h1>
          <div style={{ fontSize: '1.75rem', fontWeight: '600' }}>{formattedPrice}</div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{product.description}</p>
          
          <button 
            onClick={handleAdd}
            disabled={product.quantity === 0}
            style={{ 
              backgroundColor: 'var(--accent-brand)', 
              color: '#ffffff', 
              border: 'none', 
              padding: '0.75rem 1.5rem', 
              borderRadius: 'var(--input-radius)', 
              fontWeight: '600', 
              cursor: product.quantity === 0 ? 'not-allowed' : 'pointer', 
              marginTop: '1rem',
              opacity: product.quantity === 0 ? 0.5 : 1,
              transition: 'var(--transition-smooth)'
            }}
          >
            {product.quantity === 0 ? 'SOLD OUT' : 'ADD TO BAG'}
          </button>

          {/* Features Array Parser */}
          {product.features && product.features.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Features</h3>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', lineHeight: '1.6' }}>
                {product?.features?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Highlights</h3>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', lineHeight: '1.6' }}>
                {product.highlights.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 2. SPECIFICATIONS & UTILITY BLOCKS */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem 2rem', borderTop: '1px solid #27272a', paddingTop: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="md:grid-cols-[2fr_1fr]">
          
          {/* Tech Specifications */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Technical Specifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Technical Specs Array Object Parser */}
              {product.technicalSpecifications && product.technicalSpecifications.length > 0 ? (
                product?.technicalSpecifications?.map((spec, index) => (
                  <div key={index} className="spec-row" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--bg-surface)', fontSize: '0.95rem' }}>
                    <span className="spec-title" style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{spec.key}</span>
                    <span className="spec-value" style={{ fontWeight: '500' }}>{spec.value}</span>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>Specifications not available for this product.</p>
              )}
            </div>
          </div>

          {/* Side Box Package */}
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid #27272a', borderRadius: '8px', padding: '1.5rem', height: 'fit-content' }}>
            <h4 style={{ fontSize: '1rem', marginTop: 0, marginBottom: '1rem' }}>What's In The Box</h4>
            <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {product.whatsInTheBox && product.whatsInTheBox.length > 0 ? (
                product.whatsInTheBox.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <>
                  <li>{product.name}</li>
                  <li>Standard Documentation</li>
                </>
              )}
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
