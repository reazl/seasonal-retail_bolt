import { useState, useCallback } from 'react';
import type { View } from '@/types';

export function useNavigation() {
  const [view, setViewState] = useState<View>({ type: 'home' });

  const navigate = useCallback((newView: View) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setViewState(newView);
  }, []);

  return { view, navigate };
}
