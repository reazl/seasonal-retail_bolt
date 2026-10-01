import { useState, useEffect } from 'react';
import { Menu, ShoppingBag, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCampaign } from '@/context/CampaignContext';
import type { View } from '@/types';

interface HeaderProps {
  onNavigate: (view: View) => void;
  onOpenSearch: () => void;
}

export function Header({ onNavigate, onOpenSearch }: HeaderProps) {
  const { totalItems, openCart } = useCart();
  const { activeCampaign } = useCampaign();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { label: 'Каталог', view: { type: 'catalog' as const } },
    { label: 'Коллекции', view: { type: 'catalog' as const } },
    { label: 'Доставка', view: { type: 'home' as const } },
    { label: 'О нас', view: { type: 'home' as const } },
  ];

  return (
    <>
      {activeCampaign.promotionalBanner && (
        <div
          className="text-center py-2.5 text-xs tracking-wide font-medium text-on-atmospheric transition-colors duration-500"
          style={{ background: 'var(--campaign-accent)' }}
        >
          {activeCampaign.promotionalBanner}
        </div>
      )}

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
        style={{
          background: scrolled ? 'var(--color-ivory)' : 'var(--color-ivory)',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-1 -ml-1"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Открыть меню"
              >
                <Menu size={22} />
              </button>

              <button
                onClick={() => onNavigate({ type: 'home' })}
                className="flex items-center gap-2"
                aria-label="BOTANICA — на главную"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <path
                    d="M14 4C14 4 8 8 8 14C8 18 11 21 14 21C17 21 20 18 20 14C20 8 14 4 14 4Z"
                    stroke="var(--campaign-accent)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 21V25M14 14L14 21"
                    stroke="var(--campaign-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  className="text-lg lg:text-xl font-semibold tracking-[0.15em] uppercase"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Botanica
                </span>
              </button>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.view)}
                  className="text-sm font-medium tracking-wide text-[var(--color-near-black)] hover:text-campaign transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={onOpenSearch}
                className="p-2 hover:text-campaign transition-colors duration-200"
                aria-label="Поиск"
              >
                <Search size={20} />
              </button>
              <button
                onClick={openCart}
                className="relative p-2 hover:text-campaign transition-colors duration-200"
                aria-label="Корзина"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-semibold text-[var(--color-ivory)] rounded-full px-1"
                    style={{ background: 'var(--campaign-accent)' }}
                  >
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="absolute left-0 top-0 h-full w-[80%] max-w-sm bg-[var(--color-ivory)] p-6 flex flex-col"
            style={{ animation: 'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) forwards' }}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                Botanica
              </span>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Закрыть меню">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavigate(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-lg font-medium py-3 border-b border-[var(--color-border)] hover:text-campaign transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
