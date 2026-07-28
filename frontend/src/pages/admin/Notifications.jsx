import React, { useState } from 'react';
import { useNotifications } from '@/hooks';
import { formatDate } from '@/lib/utils';
import { Bell, Mail, Smartphone, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Notifications() {
  const { data: notifications = [], isLoading } = useNotifications();
  const [expandedNotificationId, setExpandedNotificationId] = useState(null);

  const toggleRow = (id) => {
    setExpandedNotificationId(prev => prev === id ? null : id);
  };

  const getTypeIcon = (type) => {
    if (type === 'EMAIL') return <Mail className="w-4 h-4" />;
    if (type === 'SMS') return <Smartphone className="w-4 h-4" />;
    return <Bell className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications Log</h1>
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
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Type</th>
                <th className="px-4 sm:px-6 py-3 max-w-xs">Message</th>
                <th className="px-4 sm:px-6 py-3">Status</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Sent At</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="8" className="text-center py-8">Loading notifications...</td></tr>
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
                  <React.Fragment key={notification.id}>
                    <tr 
                      onClick={() => toggleRow(notification.id)}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <button className="p-1 text-gray-500 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                          {expandedNotificationId === notification.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-white hidden md:table-cell">#{notification.id ? String(notification.id).slice(0, 6) : 'N/A'}</td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{notification.orderId ? String(notification.orderId).slice(0, 8) : 'N/A'}</td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{notification.userId ? String(notification.userId).slice(0, 8) : 'N/A'}</td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          {getTypeIcon(notification.type)}
                          <span className="text-xs font-medium">{notification.type || 'SYSTEM'}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 max-w-xs truncate" title={notification.message}>
                        {notification.message}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {notification.status === 'SENT' || notification.status === 'SUCCESS' ? (
                            <><CheckCircle2 className="w-4 h-4 text-green-500" /><span className="text-green-600 dark:text-green-400 font-medium">Sent</span></>
                          ) : (
                            <><XCircle className="w-4 h-4 text-red-500" /><span className="text-red-600 dark:text-red-400 font-medium">Failed</span></>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        {formatDate(notification.createdAt)}
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedNotificationId === notification.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50/50 dark:bg-gray-800/50 border-b dark:border-gray-700"
                        >
                          <td colSpan="8" className="px-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pl-4 sm:pl-10">
                              <div className="sm:col-span-2">
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Full Message</span>
                                <span className="text-gray-900 dark:text-white break-words">{notification.message || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Notification ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{notification.id || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Type</span>
                                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                                  {getTypeIcon(notification.type)}
                                  <span>{notification.type || 'SYSTEM'}</span>
                                </div>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Order ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{notification.orderId || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">User ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{notification.userId || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Sent At</span>
                                <span className="text-gray-900 dark:text-white">{formatDate(notification.createdAt)}</span>
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
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">No notifications found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
