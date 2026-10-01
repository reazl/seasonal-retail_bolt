import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { CampaignConfig } from '@/types';
import { campaigns, defaultCampaignId } from '@/data/campaigns';

interface CampaignContextValue {
  activeCampaign: CampaignConfig;
  campaignId: string;
  setCampaignId: (id: string) => void;
}

const CampaignContext = createContext<CampaignContextValue | null>(null);

const STORAGE_KEY = 'botanica-campaign';

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaignId, setCampaignIdState] = useState<string>(() => {
    if (typeof window === 'undefined') return defaultCampaignId;
    return localStorage.getItem(STORAGE_KEY) || defaultCampaignId;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, campaignId);
  document.documentElement.style.setProperty('--campaign-accent', campaigns[campaignId].colors.accent);
    document.documentElement.style.setProperty('--campaign-accent-secondary', campaigns[campaignId].colors.accentSecondary);
    document.documentElement.style.setProperty('--campaign-atmospheric', campaigns[campaignId].colors.atmospheric);
    document.documentElement.style.setProperty('--campaign-atmospheric-deep', campaigns[campaignId].colors.atmosphericDeep);
    document.documentElement.style.setProperty('--campaign-text-on-atmospheric', campaigns[campaignId].colors.textOnAtmospheric);
    document.documentElement.style.setProperty('--campaign-hero-overlay', campaigns[campaignId].colors.heroOverlay);
  }, [campaignId]);

  const setCampaignId = useCallback((id: string) => {
    setCampaignIdState(id);
  }, []);

  const activeCampaign = campaigns[campaignId] || campaigns[defaultCampaignId];

  return (
    <CampaignContext.Provider value={{ activeCampaign, campaignId, setCampaignId }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const ctx = useContext(CampaignContext);
  if (!ctx) throw new Error('useCampaign must be used within CampaignProvider');
  return ctx;
}
