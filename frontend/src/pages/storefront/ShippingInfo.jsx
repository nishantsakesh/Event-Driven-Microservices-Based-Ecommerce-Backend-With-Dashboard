import React from 'react';

export default function ShippingInfo() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8" style={{ color: 'var(--text-main)' }}>
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-tighter">Shipping Information</h1>
      <div className="space-y-8 text-[var(--text-muted)] text-lg leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Processing Time</h2>
          <p>All premium audio components are carefully inspected and securely packaged before dispatch. Orders are processed within 1-2 business days.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Domestic & International Shipping</h2>
          <p>We offer fully insured domestic shipping with a standard delivery time of 3-5 business days. International shipping for reference-grade equipment takes 7-14 business days depending on customs clearance.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Tracking & Packaging</h2>
          <p>Once your order ships, you will receive a tracking link. We use unbranded, reinforced exterior packaging to ensure the safety and security of your high-fidelity gear during transit.</p>
        </section>
      </div>
    </div>
  );
}
