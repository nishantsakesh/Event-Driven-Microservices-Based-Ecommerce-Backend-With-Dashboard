import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingCart, CreditCard, 
  Warehouse, Bell, Users, BarChart3, Activity, Settings, ArrowLeft 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
  { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
  { icon: Warehouse, label: 'Inventory', path: '/admin/inventory' },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Activity, label: 'Service Health', path: '/admin/health' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminSidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-0 h-screen w-64 bg-neutral-900/80 backdrop-blur-xl border-r border-white/10 flex flex-col z-40 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link to="/admin/dashboard" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              AUDIOHUB
            </span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              Admin
            </span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? "bg-purple-600/20 border-l-2 border-purple-500 text-white" 
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.03] border-l-2 border-transparent"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
        
        <div className="p-4 border-t border-white/10 shrink-0">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/[0.03] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Store
          </Link>
        </div>
      </aside>
    </>
  );
}
