import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { User, Shield } from 'lucide-react';

export default function Settings() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Profile</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View your administrator profile details.
          </p>
        </div>
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name || 'Administrator'}</h4>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                <Shield className="w-4 h-4 text-purple-500" /> Admin Access
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input 
                type="email" 
                readOnly 
                value={user?.email || 'admin@audiohub.com'} 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User ID</label>
              <input 
                type="text" 
                readOnly 
                value={user?.id ? String(user.id) : 'admin-1'} 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-mono text-sm outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
