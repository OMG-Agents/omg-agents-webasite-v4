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
    // Detect mobile device for optimized timing
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Simulate page load sequence
    const loadSequence = async () => {
      // Initial load
      setState(prev => ({ ...prev, isLoaded: true }));
      
      // Progress simulation - faster on mobile
      const progressDelay = isMobile ? 30 : 50;
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, progressDelay));
        setState(prev => ({ ...prev, loadProgress: i }));
      }

      // Hero section ready - longer delay on mobile for stability
      const heroDelay = isMobile ? 400 : 200;
      await new Promise(resolve => setTimeout(resolve, heroDelay));
      setState(prev => ({ ...prev, isHeroVisible: true }));

      // Content ready - longer delay on mobile
      const contentDelay = isMobile ? 500 : 300;
      await new Promise(resolve => setTimeout(resolve, contentDelay));
      setState(prev => ({ ...prev, isContentReady: true }));
    };

    loadSequence();
  }, []);

  return state;
}
