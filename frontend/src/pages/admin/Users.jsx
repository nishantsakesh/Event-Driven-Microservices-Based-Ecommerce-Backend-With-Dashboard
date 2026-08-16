import React, { useState } from 'react';
import { useUsers } from '@/hooks';
import { formatDate, getInitials } from '@/lib/utils';
import { Shield, ShieldAlert, User, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Users() {
  const { data: users = [], isLoading } = useUsers();
  const [expandedUserId, setExpandedUserId] = useState(null);

  const toggleRow = (id) => {
    setExpandedUserId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 sm:px-6 py-3 w-10"></th>
                <th className="px-4 sm:px-6 py-3">User</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">ID</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Email</th>
                <th className="px-4 sm:px-6 py-3">Role</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Created At</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="6" className="text-center py-8">Loading users...</td></tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <React.Fragment key={user.id}>
                    <tr 
                      onClick={() => toggleRow(user.id)}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <button className="p-1 text-gray-500 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                          {expandedUserId === user.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                            {getInitials(user.name || 'User')}
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">{user.name || 'Unknown User'}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-mono text-xs hidden md:table-cell">{user.id ? String(user.id).slice(0, 10) : 'N/A'}...</td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{user.email}</td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {user.role === 'ADMIN' ? (
                            <><ShieldAlert className="w-4 h-4 text-purple-500" /> <span className="text-purple-600 dark:text-purple-400 font-medium">ADMIN</span></>
                          ) : (
                            <><User className="w-4 h-4 text-gray-500" /> <span className="text-gray-600 dark:text-gray-400 font-medium">USER</span></>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedUserId === user.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50/50 dark:bg-gray-800/50 border-b dark:border-gray-700"
                        >
                          <td colSpan="6" className="px-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pl-4 sm:pl-10">
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Full User ID</span>
                                <span className="font-mono text-gray-900 dark:text-white">{user.id || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Email Address</span>
                                <span className="text-gray-900 dark:text-white">{user.email}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Account Created</span>
                                <span className="text-gray-900 dark:text-white">{formatDate(user.createdAt)}</span>
                              </div>
                              <div>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Last Login</span>
                                <span className="text-gray-900 dark:text-white">{user.lastLoginAt ? formatDate(user.lastLoginAt) : 'N/A'}</span>
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
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
