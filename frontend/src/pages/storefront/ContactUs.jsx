import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
              Get in Touch
            </h1>
            <p className="text-neutral-400 text-lg">
              Have a question about our audio gear? Need help with an order? We're here to help you achieve the perfect sound.
            </p>
          </div>

          <div className="space-y-6 text-neutral-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center border border-white/10">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-white">Email Us</p>
                <p className="text-sm">support@audiohub.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center border border-white/10">
                <Phone className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-white">Call Us</p>
                <p className="text-sm">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center border border-white/10">
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-white">Visit Us</p>
                <p className="text-sm">#42, 100 Feet Road, Indiranagar<br/>Bangalore 560038, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-neutral-900 p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-semibold text-white mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-1">Message</label>
              <textarea
                id="message"
                required
                rows="5"
                className="w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-purple-500 text-white resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
            >
              {submitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
