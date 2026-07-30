import React from 'react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 text-neutral-300"
      >
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and using AudioHub, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">2. Product Information</h2>
          <p>
            We strive to display our audio equipment as accurately as possible. However, we do not guarantee that product descriptions, pricing, or other content is completely error-free. Audio specifications are subject to manufacturer changes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account. We reserve the right to terminate accounts at our sole discretion.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">4. Order Processing</h2>
          <p>
            All orders are subject to acceptance and availability. Our automated systems will reserve inventory upon checkout, but we reserve the right to cancel any order due to stock issues or suspected fraud.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
