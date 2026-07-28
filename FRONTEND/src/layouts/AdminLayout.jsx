import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { LogOut, User, Menu } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLayout() {
  const { user, isAuthenticated } = useAuthStore();
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsHydrated(useAuthStore.persist.hasHydrated());
    const unsub = useAuthStore.persist.onFinishHydration(() => setIsHydrated(true));
    return () => {
      if (unsub) unsub();
    };
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user || user.role !== 'ADMIN') {
    toast.error('Unauthorized access. Admin privileges required.');
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <header className="h-20 bg-neutral-900/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-neutral-400 hover:text-white focus:outline-none"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold capitalize truncate">
              {location.pathname.split('/').pop().replace('-', ' ') || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-neutral-400">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-600 flex items-center justify-center border border-white/20">
                {user.name?.charAt(0) || <User className="w-5 h-5" />}
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
