import React from 'react';
import { motion } from 'framer-motion';

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 text-neutral-300"
      >
        <h1 className="text-4xl font-bold text-white mb-8">Refund & Return Policy</h1>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">1. Return Window</h2>
          <p>
            We want you to be completely satisfied with your audio equipment. You may return most new, unopened items within 30 days of delivery for a full refund.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">2. Condition of Returned Items</h2>
          <p>
            To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging. Due to hygiene reasons, in-ear monitors (IEMs) and earphones cannot be returned once the seal is broken, unless defective.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">3. Refund Processing</h2>
          <p>
            Once your return is received and inspected, we will send you an email to notify you of the approval or rejection of your refund. Approved refunds will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
