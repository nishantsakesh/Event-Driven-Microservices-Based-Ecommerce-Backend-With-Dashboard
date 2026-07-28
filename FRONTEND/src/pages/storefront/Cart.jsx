import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, CreditCard, DollarSign, Truck } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { useCreateOrder } from '@/hooks';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

export default function Cart() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const createOrder = useCreateOrder();
  
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    street: '', city: '', postalCode: '', phone: '', paymentMethod: 'CREDIT_CARD'
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + tax + shipping;

  const handleCheckoutClick = () => {
    if (!user) {
      toast.error('Please log in to checkout');
      navigate('/login?redirect=/cart');
      return;
    }
    if (user.role === 'ADMIN') {
      toast.error('Admin accounts cannot place customer orders. Please log in as a Customer.');
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!checkoutForm.street || !checkoutForm.city || !checkoutForm.postalCode || !checkoutForm.phone) {
      toast.error('Please fill in all shipping details');
      return;
    }

    const orderData = {
      userId: user.id,
      items: items.map(i => ({ productId: i.id, quantity: i.quantity })),
      shippingAddress: {
        street: checkoutForm.street,
        city: checkoutForm.city,
        postalCode: checkoutForm.postalCode,
        country: 'US', // default
        phone: checkoutForm.phone
      },
      paymentMethod: checkoutForm.paymentMethod
    };

    createOrder.mutate(orderData, {
      onSuccess: () => {
        clearCart();
        setIsCheckoutModalOpen(false);
        toast.success('Order received — processing your acquisition...', { duration: 2000 });
        // Brief delay to allow the async RabbitMQ pipeline to persist the order row
        // before MyOrders page fires its fetch query (RabbitMQ AMQP, port 5672)
        setTimeout(() => navigate('/my-orders'), 1200);
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || 'Failed to place order. Please try again.');
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 flex flex-col items-center justify-center text-white">
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-12 flex flex-col items-center text-center max-w-lg w-full">
          <div className="w-24 h-24 bg-[#FF9F0A]/10 flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-[#FF9F0A]" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-neutral-400 mb-8">Looks like you haven't added any premium audio gear to your cart yet.</p>
          <Link 
            to="/products"
            className="px-8 py-4 rounded-full bg-[#FF9F0A] text-[#050505] font-bold uppercase tracking-widest rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#8E8E93] pt-24 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-[#00E5FF] uppercase text-xs tracking-widest bg-[#00E5FF]/10 px-3 py-1">
            🛒 Your Shopping Bag
          </span>
          <h1 className="text-3xl font-black tracking-tighter uppercase text-white">Cart Overview</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-grow space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -50 }}
                  key={item.id}
                  className="bg-[#0A0A0A] border border-[#1F1F1F] p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center"
                >
                  <div className="w-24 h-24 bg-[#050505] border border-[#1F1F1F] flex-shrink-0 p-2 flex items-center justify-center relative overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-3xl font-bold text-neutral-700">{item.name.charAt(0)}</span>
                    )}
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left w-full">
                    <div className="text-sm text-neutral-500 mb-1">{item.brand}</div>
                    <Link to={`/products/${item.id}`} className="font-semibold text-lg hover:text-[#FF9F0A] transition-colors block line-clamp-1">
                      {item.name}
                    </Link>
                    <div className="font-mono text-[#FF9F0A] mt-2">{formatPrice(item.price)}</div>
                  </div>

                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-3 bg-[#050505] border border-[#1F1F1F] p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1.5 hover:bg-white/[0.1] rounded-md transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-mono text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-white/[0.1] rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="font-mono font-bold w-24 text-right text-white">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-neutral-500 hover:text-[#FF9F0A] hover:bg-[#FF9F0A]/10 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-8 sticky top-24">
              <h2 className="text-2xl font-black tracking-tighter uppercase text-white mb-6">Summary</h2>
              
              <div className="space-y-4 mb-6 text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <div className="text-xs font-mono text-tube-amber bg-tube-amber/10 border border-tube-amber/20 p-2 text-center">
                    Add {formatPrice(200 - subtotal)} more for free shipping
                  </div>
                )}
              </div>
              
              <div className="border-t border-[#1F1F1F] pt-6 mb-8 flex justify-between items-end">
                <span className="text-lg font-medium">Total</span>
                <span className="text-3xl font-mono font-bold text-white">{formatPrice(total)}</span>
              </div>

              {user?.role === 'ADMIN' ? (
                <div className="p-4 bg-[#0A0A0A] border border-tube-amber/30 text-[#8E8E93] text-xs text-center space-y-2">
                  <p className="font-mono text-tube-amber uppercase tracking-widest text-xs">Administrator Account</p>
                  <p>Shopping is disabled for Admin accounts. Switch to a Customer account to place orders.</p>
                </div>
              ) : (
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-4 font-black text-lg bg-tube-amber text-void uppercase tracking-widest shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(255,159,10,0.3)] transition-all duration-500"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Simple Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A] border border-[#1F1F1F] p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-black tracking-tighter uppercase text-white mb-6">Checkout</h2>
            
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-[#FF9F0A] uppercase text-xs tracking-wider">Shipping Details</h3>
                <input 
                  type="text" required placeholder="Street Address"
                  value={checkoutForm.street} onChange={e => setCheckoutForm({...checkoutForm, street: e.target.value})}
                  className="w-full bg-[#050505] border border-[#1F1F1F] rounded-none px-4 py-3 focus:outline-none focus:border-[#00E5FF] text-[#FAFAFA] transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)] transition-colors"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" required placeholder="City"
                    value={checkoutForm.city} onChange={e => setCheckoutForm({...checkoutForm, city: e.target.value})}
                    className="w-full bg-[#050505] border border-[#1F1F1F] rounded-none px-4 py-3 focus:outline-none focus:border-[#00E5FF] text-[#FAFAFA] transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  />
                  <input 
                    type="text" required placeholder="Postal Code"
                    value={checkoutForm.postalCode} onChange={e => setCheckoutForm({...checkoutForm, postalCode: e.target.value})}
                    className="w-full bg-[#050505] border border-[#1F1F1F] rounded-none px-4 py-3 focus:outline-none focus:border-[#00E5FF] text-[#FAFAFA] transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  />
                </div>
                <input 
                  type="tel" required placeholder="Phone Number"
                  value={checkoutForm.phone} onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                  className="w-full bg-[#050505] border border-[#1F1F1F] rounded-none px-4 py-3 focus:outline-none focus:border-[#00E5FF] text-[#FAFAFA] transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-[#FF9F0A] uppercase text-xs tracking-wider">Payment Method</h3>
                <div className="grid grid-cols-1 gap-3">
                  {['CREDIT_CARD', 'PAYPAL', 'CASH_ON_DELIVERY'].map((method) => (
                    <label key={method} className={`flex items-center gap-3 p-4 border cursor-pointer transition-all duration-300 ${checkoutForm.paymentMethod === method ? 'bg-ref-teal/10 border-ref-teal text-white' : 'bg-[#050505] border-[#1F1F1F] hover:border-[#2F2F2F] text-[#8E8E93]'}`}>
                      <input 
                        type="radio" name="payment" value={method} 
                        checked={checkoutForm.paymentMethod === method}
                        onChange={(e) => setCheckoutForm({...checkoutForm, paymentMethod: e.target.value})}
                        className="hidden"
                      />
                      {method === 'CREDIT_CARD' && <CreditCard className="w-5 h-5 text-neutral-400" />}
                      {method === 'PAYPAL' && <DollarSign className="w-5 h-5 text-neutral-400" />}
                      {method === 'CASH_ON_DELIVERY' && <Truck className="w-5 h-5 text-neutral-400" />}
                      <span className="font-medium text-sm">{method.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#1F1F1F]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-neutral-400">Total to pay</span>
                  <span className="text-2xl font-mono font-bold">{formatPrice(total)}</span>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-[#1F1F1F] hover:bg-[#333333] transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={createOrder.isPending}
                    className="flex-[2] py-3 rounded-xl bg-[#FF9F0A] text-[#050505] hover:opacity-90 font-bold uppercase tracking-widest rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)] disabled:opacity-50"
                  >
                    {createOrder.isPending ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
