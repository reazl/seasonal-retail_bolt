import { useCampaign } from '@/context/CampaignContext';

export function EditorialSection() {
  const { activeCampaign } = useCampaign();
  const { editorial, colors } = activeCampaign;

  const isDark = colors.textOnAtmospheric === '#F5F2EB';

  return (
    <section
      className="relative py-20 lg:py-32 overflow-hidden transition-colors duration-500"
      style={{ background: colors.atmosphericDeep }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative aspect-[5/6] lg:aspect-[4/5] overflow-hidden rounded-sm order-2 lg:order-1">
            <img
              src={editorial.image}
              alt={editorial.headline}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p
              className="text-xs font-medium tracking-[0.15em] uppercase mb-4"
              style={{ color: colors.accent }}
            >
              {activeCampaign.name}
            </p>
            <h2
              className="mb-5"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                lineHeight: 1.15,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                color: isDark ? '#F5F2EB' : 'var(--color-near-black)',
              }}
            >
              {editorial.headline}
            </h2>
            <p
              className="text-base lg:text-lg leading-relaxed max-w-md"
              style={{
                color: isDark ? 'rgba(245, 242, 235, 0.85)' : 'var(--color-sage)',
              }}
            >
              {editorial.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
