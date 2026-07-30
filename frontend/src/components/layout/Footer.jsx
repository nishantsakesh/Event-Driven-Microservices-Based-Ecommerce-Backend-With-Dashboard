import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Globe, Share2, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-premium-void border-t border-premium-slate/15 pt-20 pb-10 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Products Column */}
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Products</h3>
            <ul className="space-y-4">
              <li><Link to="/products?category=HEADPHONE" className="text-premium-cement hover:text-premium-wheat text-sm transition-colors">Headphones</Link></li>
              <li><Link to="/products?category=EARPHONE" className="text-premium-cement hover:text-premium-wheat text-sm transition-colors">Earbuds</Link></li>
              <li><Link to="/products?category=SPEAKER" className="text-premium-cement hover:text-premium-wheat text-sm transition-colors">Speakers</Link></li>
            </ul>
          </div>
          
          {/* Support Column */}
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Support</h3>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-premium-cement hover:text-premium-wheat text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/refund" className="text-premium-cement hover:text-premium-wheat text-sm transition-colors">Refund Policy</Link></li>
              <li><Link to="/shipping" className="text-premium-cement hover:text-premium-wheat text-sm transition-colors">Shipping Information</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-premium-cement hover:text-premium-wheat text-sm transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="text-premium-cement hover:text-premium-wheat text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-premium-cement hover:text-premium-wheat text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div>
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Newsletter</h3>
            <p className="text-premium-cement text-sm leading-relaxed mb-6">
              Join the Inner Circle. Get exclusive access to limited-run audio drops.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="footer-newsletter-input flex-1 rounded-l-[4px]"
                required
              />
              <button 
                type="submit" 
                className="bg-premium-gold text-premium-void px-6 py-3 font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-colors rounded-r-[4px]"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-premium-slate/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              AudioHub<span className="text-premium-gold">.</span>
            </span>
          </Link>
          <p className="text-premium-cement text-xs font-mono">
            &copy; {new Date().getFullYear()} AUDIOHUB. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4">
            {/* Icons removed to de-clutter the baseline */}
          </div>
        </div>
      </div>
    </footer>
  );
}
