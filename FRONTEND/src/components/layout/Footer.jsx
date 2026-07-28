import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Globe, Share2, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                AUDIOHUB
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Premium audio equipment for audiophiles and professionals. Experience sound like never before with our curated collection.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-neutral-400 hover:text-purple-400 text-sm transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-neutral-400 hover:text-purple-400 text-sm transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-neutral-400 hover:text-purple-400 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-neutral-400 hover:text-purple-400 text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/products?category=HEADPHONE" className="text-neutral-400 hover:text-purple-400 text-sm transition-colors">Headphones</Link></li>
              <li><Link to="/products?category=EARPHONE" className="text-neutral-400 hover:text-purple-400 text-sm transition-colors">Earphones</Link></li>
              <li><Link to="/products?category=SPEAKER" className="text-neutral-400 hover:text-purple-400 text-sm transition-colors">Speakers</Link></li>
              <li><Link to="/products?category=SOUNDBAR" className="text-neutral-400 hover:text-purple-400 text-sm transition-colors">Soundbars</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <span className="mt-0.5">📍</span>
                <span>#42, 100 Feet Road, Indiranagar<br />Bangalore 560038, India</span>
              </li>
              <li className="flex items-center gap-3">
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <span>✉️</span>
                <span>support@audiohub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} AudioHub. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-neutral-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
