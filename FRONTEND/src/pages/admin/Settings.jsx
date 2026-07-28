import React, { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { User, Globe, Moon, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const { user } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
  });

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toast.success('Dark mode enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toast.success('Light mode enabled');
    }
  };

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

      <hr className="border-gray-200 dark:border-gray-700 my-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">System Config</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Backend connection and microservices settings.
          </p>
        </div>
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
              <Globe className="w-4 h-4" /> API Gateway URL
            </label>
            <input 
              type="text" 
              readOnly 
              value={import.meta.env.VITE_API_URL || 'http://localhost:8080'} 
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-mono text-sm outline-none"
            />
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm">
            <span className="font-semibold">Note:</span> Changing system configuration requires modifying the environment variables and rebuilding the frontend application.
          </div>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 my-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Appearance</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customize the look and feel of the dashboard.
          </p>
        </div>
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                <p className="text-sm text-gray-500">Toggle dark theme for the dashboard</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isDarkMode} 
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
