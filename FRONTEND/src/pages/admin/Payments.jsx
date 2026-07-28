import React, { useState } from 'react';
import { usePayments } from '@/hooks';
import { formatPrice, formatDate } from '@/lib/utils';
import { CreditCard, CheckCircle2, XCircle, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Payments() {
  const { data: payments = [], isLoading } = usePayments();
  const [expandedPaymentId, setExpandedPaymentId] = useState(null);

  const toggleRow = (id) => {
    setExpandedPaymentId(prev => prev === id ? null : id);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESS':
      case 'COMPLETED':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'FAILED':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Records</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 sm:px-6 py-3 w-10"></th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">ID</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Order ID</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">User ID</th>
                <th className="px-4 sm:px-6 py-3">Amount</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Method</th>
                <th className="px-4 sm:px-6 py-3">Status</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Transaction ID</th>
                <th className="px-4 sm:px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="9" className="text-center py-8">Loading payments...</td></tr>
              ) : payments.length > 0 ? (
                payments.map((payment) => (
                  <React.Fragment key={payment.id}>
                    <tr 
                      onClick={() => toggleRow(payment.id)}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <button className="p-1 text-gray-500 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                          {expandedPaymentId === payment.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-white hidden md:table-cell">#{payment.id ? String(payment.id).slice(0, 6) : 'N/A'}</td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{payment.orderId ? String(payment.orderId).slice(0, 8) : 'N/A'}...</td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{payment.userId ? String(payment.userId).slice(0, 8) : 'N/A'}...</td>
                      <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {formatPrice(payment.amount)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="capitalize">{payment.paymentMethod?.toLowerCase().replace('_', ' ') || 'Card'}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(payment.status)}
                          <span className="text-sm font-medium">{payment.status}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-mono text-xs text-gray-500 dark:text-gray-400 hidden md:table-cell">
                        {payment.transactionId || 'N/A'}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        {formatDate(payment.createdAt)}
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedPaymentId === payment.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50/50 dark:bg-gray-800/50 border-b dark:border-gray-700"
                        >
                          <td colSpan="9" className="px-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pl-4 sm:pl-10">
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Payment ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{payment.id || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Order ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{payment.orderId || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">User ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{payment.userId || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Payment Method</span>
                                <span className="text-gray-900 dark:text-white capitalize">{payment.paymentMethod?.toLowerCase().replace('_', ' ') || 'Card'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Transaction ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{payment.transactionId || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Processed At</span>
                                <span className="text-gray-900 dark:text-white">{formatDate(payment.createdAt)}</span>
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
                  <td colSpan="9" className="px-6 py-8 text-center text-gray-500">No payments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
