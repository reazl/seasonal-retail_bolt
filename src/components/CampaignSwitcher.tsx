import { useState } from 'react';
import { useCampaign } from '@/context/CampaignContext';
import { campaigns, campaignOrder } from '@/data/campaigns';
import { Palette, X, Check } from 'lucide-react';

export function CampaignSwitcher() {
  const { campaignId, setCampaignId } = useCampaign();
  const [open, setOpen] = useState(false);

  const switchableCampaigns = campaignOrder.map((id) => campaigns[id]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-full shadow-lg bg-[var(--color-near-black)] text-[var(--color-ivory)] hover:scale-105 transition-transform duration-200"
        aria-label="Переключить сезон"
      >
        <Palette size={14} />
        <span className="hidden sm:inline">Сезон: {campaigns[campaignId]?.name}</span>
        <span className="sm:hidden">Сезон</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-md bg-[var(--color-ivory)] rounded-sm p-6 animate-slide-up shadow-2xl">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Palette size={18} className="text-campaign" />
                <h3 className="text-lg font-medium">Демо-переключатель сезонов</h3>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Закрыть">
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-[var(--color-sage)] mb-5">
              Инструмент для предпросмотра. Не отображается в продакшене.
            </p>

            <div className="space-y-2">
              {switchableCampaigns.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCampaignId(c.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-sm border transition-all duration-200 ${
                    campaignId === c.id
                      ? 'border-campaign bg-campaign/5'
                      : 'border-[var(--color-border)] hover:border-campaign'
                  }`}
                >
                  <span
                    className="w-10 h-10 rounded-sm flex-shrink-0"
                    style={{ background: c.colors.accent }}
                  />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-[var(--color-sage)]">{c.headline}</p>
                  </div>
                  {campaignId === c.id && <Check size={18} className="text-campaign" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
