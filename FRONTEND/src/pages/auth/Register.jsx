import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/api/services';
import { toast } from 'sonner';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'CUSTOMER' });
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);
      await authService.register(formData);
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-void relative overflow-hidden font-sans">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-ref-teal/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-tube-amber/5 rounded-full blur-[128px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <p className="text-xs font-mono text-ref-teal uppercase tracking-widest mb-2">Registration</p>
            <h1 className="text-3xl font-black tracking-tighter uppercase text-white mb-2">Create Account</h1>
            <p className="text-xs font-mono text-[#8E8E93]">Join the AudioHub audiophile community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-widest text-[#8E8E93] ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8E8E93]">
                  <User className="w-4 h-4 text-ref-teal" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-[#050505] border border-[#1F1F1F] text-white font-mono text-sm placeholder-[#8E8E93]/50 focus:outline-none focus:border-ref-teal transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-widest text-[#8E8E93] ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8E8E93]">
                  <Mail className="w-4 h-4 text-ref-teal" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-[#050505] border border-[#1F1F1F] text-white font-mono text-sm placeholder-[#8E8E93]/50 focus:outline-none focus:border-ref-teal transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-widest text-[#8E8E93] ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8E8E93]">
                  <Lock className="w-4 h-4 text-tube-amber" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-[#050505] border border-[#1F1F1F] text-white font-mono text-sm placeholder-[#8E8E93]/50 focus:outline-none focus:border-tube-amber transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-widest text-[#8E8E93] ml-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8E8E93]">
                  <Lock className="w-4 h-4 text-tube-amber" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-[#050505] border border-[#1F1F1F] text-white font-mono text-sm placeholder-[#8E8E93]/50 focus:outline-none focus:border-tube-amber transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-tube-amber text-void font-black uppercase tracking-widest text-sm hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(255,159,10,0.3)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-void" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs font-mono text-[#8E8E93]">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-bold hover:text-ref-teal transition-colors uppercase tracking-widest">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
