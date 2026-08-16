import React, { useState } from 'react';
import { useOrders, useCancelOrder, useMarkCodPaid, useUpdateOrderStatus } from '@/hooks';
import { formatPrice, formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { Filter, ChevronDown, ChevronUp, XCircle, Eye, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Orders() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  const { data: orders = [], isLoading } = useOrders();
  const cancelOrder = useCancelOrder();
  const markCodPaid = useMarkCodPaid();
  const updateStatus = useUpdateOrderStatus();

  const filteredOrders = statusFilter === 'ALL' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const toggleRow = (id) => {
    setExpandedOrderId(prev => prev === id ? null : id);
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder.mutateAsync(orderId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleMarkCodPaid = async (orderId) => {
    if (window.confirm('Mark this COD order as paid?')) {
      try {
        await markCodPaid.mutateAsync(orderId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status: newStatus });
    } catch (error) {
      console.error(error);
    }
  };

  const statusOptions = ['ALL', 'PAYMENT_PENDING', 'ORDER_CONFIRMED', 'PAID', 'PAYMENT_COMPLETED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'PAYMENT_FAILED'];
  const updateStatusOptions = ['PAYMENT_PENDING', 'ORDER_CONFIRMED', 'PAID', 'PAYMENT_COMPLETED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
        
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
          <Filter className="w-4 h-4 text-gray-500 ml-2" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent border-none text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-0 cursor-pointer outline-none"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 sm:px-6 py-3 w-10"></th>
                <th className="px-4 sm:px-6 py-3">Order ID</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Customer</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Date</th>
                <th className="px-4 sm:px-6 py-3">Total</th>
                <th className="px-4 sm:px-6 py-3">Status</th>
                <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="7" className="text-center py-8">Loading orders...</td></tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr 
                      onClick={() => toggleRow(order.id)}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <button 
                          onClick={() => toggleRow(order.id)}
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded dark:hover:bg-gray-700"
                        >
                          {expandedOrderId === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-white">#{String(order.id).slice(0, 8)}</td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{String(order.userId).slice(0, 8)}...</td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{formatDate(order.createdAt)}</td>
                      <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white">{formatPrice(order.totalAmount)}</td>
                      <td className="px-4 sm:px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium outline-none cursor-pointer appearance-none border-0
                            ${order.status === 'PAYMENT_PENDING' || order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                            ${order.status === 'PAID' || order.status === 'PAYMENT_COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                            ${order.status === 'ORDER_CONFIRMED' || order.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                            ${order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                            ${order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                            ${order.status === 'CANCELLED' || order.status === 'PAYMENT_FAILED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                          `}
                        >
                          {updateStatusOptions.map(opt => (
                            <option key={opt} value={opt} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            title="View Details"
                            onClick={(e) => { e.stopPropagation(); toggleRow(order.id); }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {order.paymentMethod === 'CASH_ON_DELIVERY' && order.status === 'PAYMENT_PENDING' && (
                            <button
                              title="Mark COD as Paid"
                              onClick={(e) => { e.stopPropagation(); handleMarkCodPaid(order.id); }}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg dark:text-green-400 dark:hover:bg-green-900/30 transition-colors"
                            >
                              <DollarSign className="w-4 h-4" />
                            </button>
                          )}
                          {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
                            <button
                              title="Cancel Order"
                              onClick={(e) => { e.stopPropagation(); handleCancelOrder(order.id); }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedOrderId === order.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50/50 dark:bg-gray-800/50 border-b dark:border-gray-700"
                        >
                          <td colSpan="7" className="px-4 sm:px-6 py-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-4 sm:pl-10">
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Order Information</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                                  <div>
                                    <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">User ID</span>
                                    <span className="font-mono text-gray-900 dark:text-white">{order.userId || 'N/A'}</span>
                                  </div>
                                  <div>
                                    <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Order Date</span>
                                    <span className="text-gray-900 dark:text-white">{formatDate(order.createdAt)}</span>
                                  </div>
                                  <div>
                                    <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Payment Method</span>
                                    <span className="text-gray-900 dark:text-white capitalize">
                                      {order.paymentMethod ? order.paymentMethod.toLowerCase().replace(/_/g, ' ') : 'N/A'}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Status</span>
                                    <span className="text-gray-900 dark:text-white font-medium">{order.status}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Order Items</h4>
                                <div className="space-y-3">
                                  {order.items?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                                        {item.imageUrl ? (
                                          <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">img</div>
                                        )}
                                      </div>
                                      <div className="flex-grow">
                                        <p className="font-medium text-gray-900 dark:text-white text-sm">{item.productName}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity} × {formatPrice(item.unitPrice)}</p>
                                      </div>
                                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                                        {formatPrice((item.quantity || 1) * (item.unitPrice || 0))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No orders found matching the selected filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
