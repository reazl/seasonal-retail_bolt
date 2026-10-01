import { useCampaign } from '@/context/CampaignContext';
import type { View } from '@/types';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: View) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { activeCampaign } = useCampaign();

  return (
    <section className="relative h-[70vh] min-h-[480px] lg:h-[85vh] lg:min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={activeCampaign.heroImage}
          alt={activeCampaign.headline}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'var(--campaign-hero-overlay)' }}
        />
      </div>

      <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-end lg:items-center pb-12 lg:pb-0">
        <div className="max-w-2xl animate-slide-up">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-[0.15em] uppercase mb-6 rounded-full"
            style={{
              background: 'var(--campaign-accent)',
              color: 'var(--color-ivory)',
            }}
          >
            {activeCampaign.badge}
          </span>

          <h1
            className="text-[var(--color-ivory)] mb-5"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              lineHeight: 1.05,
              fontWeight: 500,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {activeCampaign.headline}
          </h1>

          <p
            className="text-[var(--color-ivory)] mb-8 max-w-lg"
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
              lineHeight: 1.6,
              opacity: 0.92,
              textShadow: '0 1px 10px rgba(0,0,0,0.25)',
            }}
          >
            {activeCampaign.supportingText}
          </p>

          <button
            onClick={() => onNavigate({ type: 'catalog' })}
            className="btn-primary group"
            style={{ background: 'var(--color-ivory)', color: 'var(--campaign-accent)' }}
          >
            {activeCampaign.primaryCta}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-ivory))',
        }}
      />
    </section>
  );
}
