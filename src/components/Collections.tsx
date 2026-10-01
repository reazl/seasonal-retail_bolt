import { useCampaign } from '@/context/CampaignContext';
import { collections } from '@/data/collections';
import type { View } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface CollectionsProps {
  onNavigate: (view: View) => void;
}

export function Collections({ onNavigate }: CollectionsProps) {
  const { activeCampaign } = useCampaign();
  const campaignCollections = activeCampaign.collectionIds
    .map((id) => collections[id])
    .filter(Boolean);

  if (campaignCollections.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-[var(--color-ivory)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p
              className="text-xs font-medium tracking-[0.15em] uppercase mb-3"
              style={{ color: 'var(--campaign-accent)' }}
            >
              {activeCampaign.name}
            </p>
            <h2 className="section-title">Подборки сезона</h2>
          </div>
          <button
            onClick={() => onNavigate({ type: 'catalog' })}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium hover:text-campaign transition-colors duration-200"
          >
            Весь каталог
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {campaignCollections.map((collection, idx) => (
            <button
              key={collection.id}
              onClick={() => onNavigate({ type: 'catalog', collectionId: collection.id })}
              className="group text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-3">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading={idx < 2 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase rounded-full"
                    style={{
                      background: 'var(--color-ivory)',
                      color: 'var(--campaign-accent)',
                    }}
                  >
                    {collection.productIds.length} растений
                  </span>
                </div>
              </div>
              <h3 className="text-base lg:text-lg font-medium mb-1 group-hover:text-campaign transition-colors duration-200">
                {collection.name}
              </h3>
              <p className="text-sm text-[var(--color-sage)] line-clamp-2">
                {collection.description}
              </p>
                </button>
              ))}
        </div>
      </div>
    </section>
  );
}
