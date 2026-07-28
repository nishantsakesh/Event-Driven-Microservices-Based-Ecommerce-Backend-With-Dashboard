import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, ChevronUp, XCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useUserOrders, useCancelOrder } from '@/hooks';
import { formatPrice, formatDate, cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function MyOrders() {
  const user = useAuthStore(state => state.user);
  const { data: orders, isLoading } = useUserOrders(user?.id, { enabled: !!user });
  const cancelOrder = useCancelOrder();
  
  const [expandedOrders, setExpandedOrders] = useState({});

  if (!user) {
    return <Navigate to="/login?redirect=/my-orders" />;
  }

  const toggleOrder = (id) => {
    setExpandedOrders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCancel = (orderId) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      cancelOrder.mutate(orderId, {
        onSuccess: () => toast.success('Order cancelled successfully')
      });
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'PENDING': return { color: 'text-[#FF9F0A]', bg: 'bg-[#FF9F0A]/10', border: 'border-[#FF9F0A]/20', icon: Clock, label: 'Pending' };
      case 'PLACED': return { color: 'text-[#00E5FF]', bg: 'bg-[#00E5FF]/10', border: 'border-[#00E5FF]/20', icon: Package, label: 'Placed' };
      case 'PAYMENT_PENDING': return { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', icon: Clock, label: 'Pending Payment' };
      case 'PAYMENT_COMPLETED': return { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: CheckCircle2, label: 'Payment Completed' };
      case 'ORDER_CONFIRMED': return { color: 'text-[#00E5FF]', bg: 'bg-[#00E5FF]/10', border: 'border-[#00E5FF]/20', icon: Package, label: 'Confirmed' };
      case 'PAYMENT_FAILED': return { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: AlertCircle, label: 'Payment Failed' };
      case 'CANCELLED': return { color: 'text-neutral-400', bg: 'bg-[#050505]', border: 'border-[#1F1F1F]', icon: XCircle, label: 'Cancelled' };
      default: return { color: 'text-white', bg: 'bg-[#0A0A0A]', border: 'border-[#1F1F1F]', icon: Package, label: status };
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 bg-[#0A0A0A] border border-[#1F1F1F] flex items-center justify-center">
            <Package className="w-5 h-5 text-ref-teal" />
          </div>
          <div>
            <p className="text-xs font-mono text-ref-teal uppercase tracking-widest mb-1">Purchase History</p>
            <h1 className="text-3xl font-black tracking-tighter uppercase text-white">Order Archive</h1>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-[#0A0A0A] border border-[#1F1F1F] animate-pulse" />
            ))}
          </div>
        ) : orders?.length === 0 ? (
          <div className="text-center py-20 bg-[#0A0A0A] border border-[#1F1F1F]">
            <Package className="w-12 h-12 text-[#1F1F1F] mx-auto mb-6" />
            <h2 className="text-xl font-black tracking-tighter uppercase text-white mb-4">No orders yet</h2>
            <p className="text-[#8E8E93] font-mono text-sm mb-8">When you place orders, they will appear here.</p>
            <Link to="/products" className="px-6 py-3 bg-tube-amber text-void font-black uppercase tracking-widest text-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] hover:scale-[1.02] transition-transform">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders?.map(order => {
              const status = getStatusConfig(order.status);
              const StatusIcon = status.icon;
              const isExpanded = expandedOrders[order.id];

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={order.id} 
                  className="bg-[#0A0A0A] border border-[#1F1F1F] overflow-hidden"
                >
                  <div 
                    className="p-6 cursor-pointer hover:bg-[#050505] transition-colors flex flex-wrap gap-4 items-center justify-between"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex flex-col items-start sm:flex-row sm:items-center gap-4 sm:gap-6 flex-grow">
                      <div>
                        <div className="text-xs font-mono text-[#8E8E93] uppercase tracking-widest mb-1">Order ID</div>
                        <div className="font-mono text-sm text-white">#{String(order.id).slice(0, 8)}</div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[#8E8E93] uppercase tracking-widest mb-1">Date</div>
                        <div className="text-sm text-white font-mono">{formatDate(order.createdAt)}</div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[#8E8E93] uppercase tracking-widest mb-1">Total</div>
                        <div className="font-mono font-bold text-ref-teal">{formatPrice(order.totalAmount)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className={cn("px-3 py-1 border text-xs font-mono uppercase tracking-widest flex items-center gap-1.5", status.bg, status.border, status.color)}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-[#8E8E93]" /> : <ChevronDown className="w-4 h-4 text-[#8E8E93]" />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-[#1F1F1F] bg-void overflow-hidden"
                      >
                        <div className="p-6 space-y-6">
                          <div>
                            <h4 className="text-xs font-mono text-[#8E8E93] mb-4 uppercase tracking-widest">Order Items</h4>
                            <div className="space-y-3">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-[#0A0A0A] border border-[#1F1F1F] p-3">
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#050505] border border-[#1F1F1F] flex items-center justify-center p-1">
                                      {item.product?.imageUrl ? (
                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-contain" />
                                      ) : (
                                        <Package className="w-4 h-4 text-[#1F1F1F]" />
                                      )}
                                    </div>
                                    <div>
                                       <Link to={`/products/${item.productId}`} className="font-mono text-sm text-white hover:text-ref-teal transition-colors line-clamp-1">
                                         {item.productName || item.product?.name || `Product #${String(item.productId).slice(0, 8)}`}
                                       </Link>
                                       <div className="text-xs font-mono text-[#8E8E93]">Qty: {item.quantity}</div>
                                     </div>
                                  </div>
                                  <div className="font-mono text-right">
                                    {formatPrice((item.unitPrice || item.price || 0) * item.quantity)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-end pt-4 border-t border-[#1F1F1F]">
                            <div className="text-sm text-neutral-400">
                              <p>Status: {order.status}</p>
                            </div>
                            
                            {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleCancel(order.id); }}
                                disabled={cancelOrder.isPending}
                                className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors text-xs font-mono uppercase tracking-widest"
                              >
                                {cancelOrder.isPending ? 'Cancelling...' : 'Cancel Order'}
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
