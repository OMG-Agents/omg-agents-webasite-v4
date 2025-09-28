'use client';
import { useEffect, useState } from 'react';

interface PageLoadState {
  isLoaded: boolean;
  isHeroVisible: boolean;
  isContentReady: boolean;
  loadProgress: number;
}

export function usePageLoad() {
  const [state, setState] = useState<PageLoadState>({
    isLoaded: false,
    isHeroVisible: false,
    isContentReady: false,
    loadProgress: 0
  });

  useEffect(() => {
    // Simulate page load sequence
    const loadSequence = async () => {
      // Initial load
      setState(prev => ({ ...prev, isLoaded: true }));
      
      // Progress simulation
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setState(prev => ({ ...prev, loadProgress: i }));
      }

      // Hero section ready
      await new Promise(resolve => setTimeout(resolve, 200));
      setState(prev => ({ ...prev, isHeroVisible: true }));

      // Content ready
      await new Promise(resolve => setTimeout(resolve, 300));
      setState(prev => ({ ...prev, isContentReady: true }));
    };

    loadSequence();
  }, []);

  return state;
}
