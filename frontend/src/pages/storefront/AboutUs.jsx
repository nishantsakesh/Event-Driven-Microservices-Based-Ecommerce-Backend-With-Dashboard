import React from 'react';

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8" style={{ color: 'var(--text-main)' }}>
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
          About AudioHub
        </h1>
      </div>
      <div className="text-[var(--text-muted)] leading-relaxed space-y-6 text-xl">
        <p>
          At AudioHub, we believe high-fidelity sound shouldn’t demand a luxury markup. Our business model is intentionally simple: we operate on razor-thin profit margins to solve a massive industry problem.
        </p>
        <p>
          By cutting out unnecessary corporate bloat, we ensure our customers receive genuine, premium audio hardware for significantly less money than the rest of the market. 
        </p>
        <p>
          At the same time, our margins are precision-engineered to guarantee that every single employee on our team earns a thriving, premium-tier salary. Honest pricing for you, fair compensation for our makers, and pure uncompromised audio for everyone.
        </p>
      </div>
    </div>
  );
}
