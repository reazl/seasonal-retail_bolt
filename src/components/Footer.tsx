import type { View } from '@/types';
import { useCampaign } from '@/context/CampaignContext';
import { collections } from '@/data/collections';
import { campaigns, campaignOrder } from '@/data/campaigns';

interface FooterProps {
  onNavigate: (view: View) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { activeCampaign } = useCampaign();

  const campaignCollections = activeCampaign.collectionIds
    .map((id) => collections[id])
    .filter(Boolean);

  const allCampaigns = campaignOrder.map((id) => campaigns[id]);

  return (
    <footer className="bg-[var(--color-near-black)] text-[var(--color-ivory)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path
                  d="M14 4C14 4 8 8 8 14C8 18 11 21 14 21C17 21 20 18 20 14C20 8 14 4 14 4Z"
                  stroke="var(--color-ivory)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M14 21V25M14 14L14 21" stroke="var(--color-ivory)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-xl font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                Botanica
              </span>
            </div>
            <p className="text-sm text-[var(--color-sage)] max-w-xs leading-relaxed mb-6">
              Ботанический бутик живых растений. Один бренд, много сезонов, новая причина открыть растения каждый раз.
            </p>
            <div className="flex gap-3">
              {['TG', 'VK', 'IG', 'YT'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center text-xs font-medium border border-[var(--color-sage)]/30 rounded-sm hover:border-[var(--color-ivory)] hover:text-[var(--color-ivory)] transition-colors"
                  aria-label={s}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-[var(--color-sage)] mb-4">Каталог</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => onNavigate({ type: 'catalog' })} className="text-sm hover:text-[var(--color-sage)] transition-colors">Все растения</button></li>
              {campaignCollections.slice(0, 3).map((c) => (
                <li key={c.id}>
                  <button onClick={() => onNavigate({ type: 'catalog', collectionId: c.id })} className="text-sm hover:text-[var(--color-sage)] transition-colors">
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-[var(--color-sage)] mb-4">Сезоны</h4>
            <ul className="space-y-2.5">
              {allCampaigns.map((c) => (
                <li key={c.id}>
                  <span className="text-sm hover:text-[var(--color-sage)] transition-colors">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-[var(--color-sage)] mb-4">Информация</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm hover:text-[var(--color-sage)] transition-colors cursor-pointer">Доставка и оплата</span></li>
              <li><span className="text-sm hover:text-[var(--color-sage)] transition-colors cursor-pointer">Уход за растениями</span></li>
              <li><span className="text-sm hover:text-[var(--color-sage)] transition-colors cursor-pointer">Контакты</span></li>
              <li><span className="text-sm hover:text-[var(--color-sage)] transition-colors cursor-pointer">Политика конфиденциальности</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-sage)]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-sage)]">© 2026 Botanica. Все права защищены.</p>
          <p className="text-xs text-[var(--color-sage)]">Сделано с заботой о растениях</p>
        </div>
      </div>
    </footer>
  );
}
