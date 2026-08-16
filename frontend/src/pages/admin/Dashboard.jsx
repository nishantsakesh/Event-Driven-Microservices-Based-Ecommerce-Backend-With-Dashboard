import React, { useState } from 'react';
import { useDashboard } from '@/hooks';
import { formatPrice, formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { ShoppingCart, DollarSign, Package, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const { data, isLoading } = useDashboard();
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleRow = (id) => {
    setExpandedOrderId(prev => prev === id ? null : id);
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading dashboard data...</div>;

  const stats = data || { totalOrders: 0, totalRevenue: 0, totalProducts: 0, totalUsers: 0 };
  const revenueData = data?.revenueByDate || [];
  const orderStatusData = data?.orderStatusDistribution || [];
  const recentOrders = data?.recentOrders || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={stats.totalOrders} icon={ShoppingCart} color="bg-blue-500" />
        <StatCard title="Total Revenue" value={formatPrice(stats.totalRevenue)} icon={DollarSign} color="bg-green-500" />
        <StatCard title="Total Products" value={stats.totalProducts} icon={Package} color="bg-orange-500" />
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="bg-purple-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Revenue Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Orders by Status</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="status"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
        </div>
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
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr 
                    onClick={() => toggleRow(order.id)}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <button className="p-1 text-gray-500 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                        {expandedOrderId === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-white">#{order.id ? String(order.id).slice(0, 8) : 'N/A'}</td>
                    <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{order.userId ? String(order.userId).slice(0, 8) : 'N/A'}</td>
                    <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{formatPrice(order.totalAmount)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                        ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                        ${order.status === 'PAID' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                        ${order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                        ${order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                        ${order.status === 'CANCELLED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                      `}>
                        {order.status}
                      </span>
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
                        <td colSpan="6" className="px-6 py-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pl-4 sm:pl-10">
                            <div>
                              <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Customer ID</span>
                              <span className="font-mono text-gray-900 dark:text-white">{order.userId || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="block text-gray-500 dark:text-gray-400 text-xs mb-1">Order Date</span>
                              <span className="text-gray-900 dark:text-white">{formatDate(order.createdAt)}</span>
                            </div>
                          </div>
                          {order.items && order.items.length > 0 && (
                            <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4 pl-4 sm:pl-10">
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Order Items</h4>
                              <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between bg-white dark:bg-gray-900 p-2 rounded border border-gray-100 dark:border-gray-700 max-w-2xl">
                                    <div className="flex items-center gap-3">
                                      {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.productName} className="w-10 h-10 object-cover rounded" />
                                      ) : (
                                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">Img</div>
                                      )}
                                      <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.productName}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                      </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                      {formatPrice((item.unitPrice || item.price || 0) * (item.quantity || 1))}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No recent orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center`}>
        <Icon className={`w-6 h-6 text-current ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>
    </motion.div>
  );
}
