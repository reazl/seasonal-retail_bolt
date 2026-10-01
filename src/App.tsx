import { useState, useCallback } from 'react';
import { CampaignProvider } from '@/context/CampaignContext';
import { CartProvider } from '@/context/CartContext';
import { useNavigation } from '@/context/NavigationContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Collections } from '@/components/Collections';
import { Catalog } from '@/components/Catalog';
import { EditorialSection } from '@/components/EditorialSection';
import { TrustSection } from '@/components/TrustSection';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductDetail } from '@/components/ProductDetail';
import { CampaignSwitcher } from '@/components/CampaignSwitcher';
import { SearchModal } from '@/components/SearchModal';
import type { View } from '@/types';

function AppContent() {
  const { view, navigate } = useNavigation();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavigate = useCallback((v: View) => navigate(v), [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1">
        {view.type === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <Collections onNavigate={handleNavigate} />
            <Catalog onNavigate={handleNavigate} />
            <EditorialSection />
            <TrustSection />
          </>
        )}

        {view.type === 'catalog' && (
          <Catalog collectionId={view.collectionId} onNavigate={handleNavigate} />
        )}

        {view.type === 'product' && (
          <ProductDetail slug={view.slug} onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <CartDrawer onNavigate={handleNavigate} />
      <CampaignSwitcher />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <CampaignProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </CampaignProvider>
  );
}
