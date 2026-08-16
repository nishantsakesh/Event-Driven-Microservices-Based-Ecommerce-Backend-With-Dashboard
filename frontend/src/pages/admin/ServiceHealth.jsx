import React, { useState, useEffect } from 'react';
import { healthService } from '@/api/services';
import { Activity, RefreshCw, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const SERVICES = [
  { id: 'gateway', name: 'API Gateway', endpoint: '/api/products' },
  { id: 'auth', name: 'Auth Service', endpoint: '/api/auth/users' },
  { id: 'product', name: 'Product Service', endpoint: '/api/products' },
  { id: 'order', name: 'Order Service', endpoint: '/api/orders' },
  { id: 'payment', name: 'Payment Service', endpoint: '/api/payments' },
  { id: 'inventory', name: 'Inventory Service', endpoint: '/api/inventory' },
  { id: 'notification', name: 'Notification Service', endpoint: '/api/notifications' },
];

export default function ServiceHealth() {
  const [statuses, setStatuses] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const checkHealth = async () => {
    setIsRefreshing(true);
    const newStatuses = {};
    
    try {
      const results = await healthService.checkAll();
      results.forEach((res, index) => {
        const service = SERVICES[index];
        if (service) {
          newStatuses[service.id] = {
            status: res.status,
            responseTime: res.responseTime,
            timestamp: new Date().toISOString()
          };
        }
      });
    } catch (error) {
      SERVICES.forEach(s => {
        newStatuses[s.id] = { status: 'DOWN', responseTime: null };
      });
    }

    setStatuses(newStatuses);
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-500" />
            Service Health Monitor
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time status of microservices backend. Auto-refreshes every 30s.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">
            Last checked: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
          </span>
          <button
            onClick={checkHealth}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SERVICES.map((service, index) => {
          const s = statuses[service.id];
          const isUp = s?.status === 'UP';
          const isDown = s?.status === 'DOWN';
          const isLoading = !s;

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isUp ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : isDown ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-500'}`}>
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                    <p className="text-xs text-gray-500 font-mono">{service.endpoint}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between mt-6">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</div>
                  {isLoading ? (
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <span className="font-medium">Checking...</span>
                    </div>
                  ) : isUp ? (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      <span className="font-bold">OPERATIONAL</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                      <span className="font-bold">DOWN</span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Response Time</div>
                  <div className="font-mono font-medium text-gray-900 dark:text-white">
                    {isLoading ? '--' : isUp ? `${s.responseTime}ms` : 'Timeout'}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
