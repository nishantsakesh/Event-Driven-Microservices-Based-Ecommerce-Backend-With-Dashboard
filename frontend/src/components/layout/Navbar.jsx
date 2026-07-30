import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard, Package, ChevronDown, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const cartItems = useCartStore((state) => state.getTotalItems());
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-[#04151F]/70 backdrop-blur-xl border-b border-[#04151F]/5 dark:border-[#EFD6AC]/5 transition-all duration-300">
      {user?.role === 'ADMIN' && (
        <div className="bg-[#183A37]/10 border-b border-[#183A37]/20 text-[#183A37] dark:text-[#EFD6AC] text-xs py-1.5 px-4 text-center font-semibold flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#C44900]" />
          <span>Administrator Mode — Order Placement is restricted for Admin accounts.</span>
          <Link to="/admin/dashboard" className="underline font-bold hover:opacity-80 ml-2">
            Go to Admin Dashboard &rarr;
          </Link>
        </div>
      )}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-[#04151F] dark:text-[#EFD6AC]">
                AudioHub<span className="text-[#C44900]">.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <NavLink to="/" className={({isActive}) => cn("text-sm font-bold tracking-wide uppercase transition-colors hover:text-[#C44900]", isActive ? "text-[#C44900]" : "text-[#04151F]/60 dark:text-[#EFD6AC]/60")}>Home</NavLink>
            <NavLink to="/products" className={({isActive}) => cn("text-sm font-bold tracking-wide uppercase transition-colors hover:text-[#C44900]", isActive ? "text-[#C44900]" : "text-[#04151F]/60 dark:text-[#EFD6AC]/60")}>Products</NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative p-2 text-[#04151F] dark:text-[#EFD6AC] hover:opacity-80 transition-opacity">
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[#C44900] rounded-full">
                  {cartItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-[#04151F] dark:text-[#EFD6AC] hover:text-[#C44900] transition-colors focus:outline-none"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline-block">Account</span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#04151F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden py-1"
                    >
                      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                        <p className="text-sm font-bold text-[#04151F] dark:text-[#EFD6AC] truncate">{user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                      </div>
                      
                      <Link to="/my-orders" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#04151F]/80 dark:text-[#EFD6AC]/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Package className="w-4 h-4" />
                        My Orders
                      </Link>
                      
                      {user?.role === 'ADMIN' && (
                        <Link to="/admin/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#C44900] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      
                      <div className="h-px bg-slate-200 dark:bg-slate-800 my-1"></div>
                      
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-bold text-[#04151F]/80 dark:text-[#EFD6AC]/80 hover:text-[#C44900] transition-colors">Login</Link>
                <Link to="/register" className="text-sm font-bold px-4 py-2 bg-[#04151F] text-white dark:bg-[#EFD6AC] dark:text-[#04151F] rounded-full hover:opacity-90 transition-opacity">Register</Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-neutral-300 hover:text-white">
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-purple-600 rounded-full">
                  {cartItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-neutral-900/95 backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-white hover:bg-white/5 rounded-lg">Home</Link>
              <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-white hover:bg-white/5 rounded-lg">Products</Link>
              
              <div className="h-px bg-white/10 my-4"></div>
              
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-neutral-400">{user?.email}</p>
                  </div>
                  <Link to="/my-orders" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-neutral-300 hover:bg-white/5 hover:text-white rounded-lg">My Orders</Link>
                  {user?.role === 'ADMIN' && (
                    <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-purple-400 hover:bg-white/5 rounded-lg">Admin Dashboard</Link>
                  )}
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:bg-white/5 hover:text-red-300 rounded-lg">Logout</button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-2 border border-white/20 rounded-full text-base font-medium text-white hover:bg-white/5">Login</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-2 bg-white rounded-full text-base font-medium text-black hover:bg-neutral-200">Register</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
