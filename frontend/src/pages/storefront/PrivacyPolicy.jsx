import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8" style={{ color: 'var(--text-main)' }}>
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-tighter">Privacy Policy</h1>
      <div className="space-y-8 text-[var(--text-muted)] text-lg leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">1. Data Collection</h2>
          <p>At AudioHub, we value your privacy as much as your audio experience. We collect essential information such as your name, shipping address, and email to process your orders and ensure secure delivery of your premium hardware.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">2. Secure Transactions</h2>
          <p>Your payment information is processed through enterprise-grade, encrypted gateways. We do not store your raw payment details on our servers.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">3. Data Usage</h2>
          <p>We use your data solely for fulfilling orders, providing customer support, and, with your explicit consent, sending you updates about limited-run audio drops. We never sell your personal information to third parties.</p>
        </section>
      </div>
    </div>
  );
}
