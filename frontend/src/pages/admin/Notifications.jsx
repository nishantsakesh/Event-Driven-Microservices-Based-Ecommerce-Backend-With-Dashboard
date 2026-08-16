import React, { useState } from 'react';
import { useNotifications, useNewsletterSubscribers, useDeleteSubscriber } from '@/hooks';
import { formatDate } from '@/lib/utils';
import { 
  Bell, Mail, FileText, CheckCircle2, XCircle, 
  ChevronDown, ChevronUp, Users, Trash2, Search, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('notifications'); // 'notifications' | 'subscribers'
  const [expandedNotificationId, setExpandedNotificationId] = useState(null);
  const [searchSubscriber, setSearchSubscriber] = useState('');

  const { data: notifications = [], isLoading: loadingNotifications } = useNotifications();
  const { data: subscribers = [], isLoading: loadingSubscribers } = useNewsletterSubscribers();
  const deleteSubscriberMutation = useDeleteSubscriber();

  const toggleRow = (id) => {
    setExpandedNotificationId(prev => prev === id ? null : id);
  };

  const getTypeIcon = (type) => {
    if (type === 'INVOICE') return <FileText className="w-4 h-4 text-amber-500" />;
    if (type === 'EMAIL') return <Mail className="w-4 h-4 text-blue-500" />;
    return <Bell className="w-4 h-4 text-purple-500" />;
  };

  const filteredSubscribers = subscribers.filter(s => 
    s.email?.toLowerCase().includes(searchSubscriber.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communications & Alerts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track order invoice notifications, system alerts, and newsletter subscriptions.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-800 p-1.5 rounded-xl border border-gray-200 dark:border-neutral-700">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'notifications'
                ? 'bg-white dark:bg-neutral-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Invoices & Notifications</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
              {notifications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'subscribers'
                ? 'bg-white dark:bg-neutral-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Newsletter Subscribers</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
              {subscribers.length}
            </span>
          </button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 1: NOTIFICATIONS & INVOICES */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-4 sm:px-6 py-3 w-10"></th>
                  <th className="px-4 sm:px-6 py-3 hidden md:table-cell">ID</th>
                  <th className="px-4 sm:px-6 py-3">Order ID</th>
                  <th className="px-4 sm:px-6 py-3">Recipient</th>
                  <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Type</th>
                  <th className="px-4 sm:px-6 py-3 max-w-xs">Message</th>
                  <th className="px-4 sm:px-6 py-3">Status</th>
                  <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Sent At</th>
                </tr>
              </thead>
              <tbody>
                {loadingNotifications ? (
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
                        <td className="px-4 sm:px-6 py-4 font-mono font-medium text-gray-900 dark:text-white hidden md:table-cell">
                          #{notification.id}
                        </td>
                        <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {notification.orderId ? `#ORD-${notification.orderId}` : 'N/A'}
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {notification.recipientName || `User #${notification.userId || 'N/A'}`}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">
                              {notification.recipientEmail || 'No email attached'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            {getTypeIcon(notification.type)}
                            <span>{notification.type || 'INVOICE'}</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 max-w-xs truncate" title={notification.message}>
                          {notification.message}
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            {notification.status === 'SENT' || notification.status === 'SUCCESS' ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                <span className="text-green-600 dark:text-green-400 font-semibold text-xs">Sent</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                <span className="text-red-600 dark:text-red-400 font-semibold text-xs">Failed</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs text-gray-400 hidden md:table-cell">
                          {formatDate(notification.sentAt || notification.createdAt)}
                        </td>
                      </tr>
                      <AnimatePresence>
                        {expandedNotificationId === notification.id && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50/70 dark:bg-gray-900/50 border-b dark:border-gray-700"
                          >
                            <td colSpan="8" className="px-6 py-5">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pl-4 sm:pl-10">
                                <div className="md:col-span-3 bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-neutral-700">
                                  <span className="block text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                                    Invoice & Notification Message
                                  </span>
                                  <p className="text-gray-900 dark:text-white leading-relaxed font-sans text-sm">
                                    {notification.message || 'No message content available.'}
                                  </p>
                                </div>

                                <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
                                  <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1 font-semibold">Recipient Customer</span>
                                  <span className="text-gray-900 dark:text-white font-medium">{notification.recipientName || 'N/A'}</span>
                                  <span className="block text-xs font-mono text-purple-400 mt-0.5">{notification.recipientEmail || 'N/A'}</span>
                                </div>

                                <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
                                  <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1 font-semibold">Order Reference</span>
                                  <span className="font-mono text-gray-900 dark:text-white">Order #{notification.orderId || 'N/A'}</span>
                                  <span className="block text-xs text-gray-400 mt-0.5">User ID: #{notification.userId || 'N/A'}</span>
                                </div>

                                <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
                                  <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1 font-semibold">Timestamp</span>
                                  <span className="text-gray-900 dark:text-white text-xs">
                                    {formatDate(notification.sentAt || notification.createdAt)}
                                  </span>
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
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400 opacity-50" />
                      No notifications recorded yet. Placing orders will trigger automatic invoice generation.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 2: NEWSLETTER SUBSCRIBERS */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'subscribers' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscriber emails..."
                value={searchSubscriber}
                onChange={(e) => setSearchSubscriber(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Showing {filteredSubscribers.length} of {subscribers.length} subscribers
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Subscriber Email</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Subscribed Date</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {loadingSubscribers ? (
                    <tr><td colSpan="5" className="text-center py-8">Loading newsletter subscribers...</td></tr>
                  ) : filteredSubscribers.length > 0 ? (
                    filteredSubscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-gray-900 dark:text-white">
                          #{subscriber.id}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>{subscriber.email}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            {subscriber.status || 'ACTIVE'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-400">
                          {formatDate(subscriber.subscribedAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to remove ${subscriber.email} from newsletter subscribers?`)) {
                                deleteSubscriberMutation.mutate(subscriber.id);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Remove Subscriber"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        <Mail className="w-8 h-8 mx-auto mb-2 text-gray-400 opacity-50" />
                        No newsletter subscribers found yet. Submissions in the store footer will appear here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
