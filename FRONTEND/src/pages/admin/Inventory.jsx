import React, { useState } from 'react';
import { useInventory } from '@/hooks';
import { formatDate } from '@/lib/utils';
import { Package, ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Inventory() {
  const { data: inventoryTransactions = [], isLoading } = useInventory();
  const [expandedTxId, setExpandedTxId] = useState(null);

  const toggleRow = (id) => {
    setExpandedTxId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory Logs</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 sm:px-6 py-3 w-10"></th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Tx ID</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Order ID</th>
                <th className="px-4 sm:px-6 py-3">Product ID</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">User ID</th>
                <th className="px-4 sm:px-6 py-3">Quantity</th>
                <th className="px-4 sm:px-6 py-3">Status</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Processed At</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="8" className="text-center py-8">Loading inventory logs...</td></tr>
              ) : inventoryTransactions.length > 0 ? (
                inventoryTransactions.map((tx) => (
                  <React.Fragment key={tx.id}>
                    <tr 
                      onClick={() => toggleRow(tx.id)}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <button className="p-1 text-gray-500 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                          {expandedTxId === tx.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-white hidden md:table-cell">#{tx.id ? String(tx.id).slice(0, 6) : 'N/A'}</td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{tx.orderId ? String(tx.orderId).slice(0, 8) : 'N/A'}</td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          {tx.productId ? String(tx.productId).slice(0, 8) : 'N/A'}...
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{tx.userId ? String(tx.userId).slice(0, 8) : 'SYSTEM'}</td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className={`flex items-center gap-1 font-semibold ${
                          tx.quantity > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {tx.quantity > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                          {Math.abs(tx.quantity)}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'SUCCESS' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          tx.status === 'FAILED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {tx.status || 'PROCESSED'}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        {formatDate(tx.createdAt || tx.processedAt)}
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedTxId === tx.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50/50 dark:bg-gray-800/50 border-b dark:border-gray-700"
                        >
                          <td colSpan="8" className="px-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pl-4 sm:pl-10">
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Transaction ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{tx.id || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Order ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{tx.orderId || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">User ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{tx.userId || 'SYSTEM'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Processed At</span>
                                <span className="text-gray-900 dark:text-white">{formatDate(tx.createdAt || tx.processedAt)}</span>
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
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">No inventory transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
